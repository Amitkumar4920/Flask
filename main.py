from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client.customerdb
customer_collection = db.customers

# Convert MongoDB data to a serializable format
def customer_serializer(customer):
    return {
        'id': str(customer['_id']),
        'name': customer['name'],
        'email': customer['email'],
        'phone': customer['phone']
    }

@app.route('/')
def index():
    return render_template('index.html')

# GET all customers or POST a new customer in the same route
@app.route('/customers', methods=['GET', 'POST'])
def handle_customers():
    if request.method == 'GET':
        customers = list(customer_collection.find())
        return jsonify([customer_serializer(customer) for customer in customers])

    elif request.method == 'POST':
        if not request.is_json:
            return jsonify({"error": "Request body must be JSON"}), 415

        data = request.get_json()  # Ensures it reads JSON data
        if not all(k in data for k in ('name', 'email', 'phone')):
            return jsonify({"error": "Missing required fields"}), 400

        new_customer = {
            'name': data['name'],
            'email': data['email'],
            'phone': data['phone']
        }
        inserted_id = customer_collection.insert_one(new_customer).inserted_id
        customer = customer_collection.find_one({'_id': ObjectId(inserted_id)})
        return jsonify(customer_serializer(customer)), 201

# GET by ID, PUT, and DELETE requests in the same route
@app.route('/customers/<id>', methods=['GET', 'PUT', 'DELETE'])
def modify_customer(id):
    try:
        obj_id = ObjectId(id)  # Ensure valid ObjectId format
    except Exception:
        return jsonify({"error": "Invalid customer ID format"}), 400

    if request.method == 'GET':
        customer = customer_collection.find_one({'_id': obj_id})
        if customer:
            return jsonify(customer_serializer(customer))
        return jsonify({"error": "Customer not found"}), 404

    elif request.method == 'PUT':
        if not request.is_json:
            return jsonify({"error": "Request body must be JSON"}), 415

        data = request.get_json()  # Ensure it reads JSON data
        if not data:
            return jsonify({"error": "Missing request body"}), 400

        updated_customer = {
            'name': data.get('name'),
            'email': data.get('email'),
            'phone': data.get('phone')
        }

        # Only update fields that are provided
        update_data = {k: v for k, v in updated_customer.items() if v is not None}

        if not update_data:
            return jsonify({"error": "No valid fields to update"}), 400

        result = customer_collection.update_one({'_id': obj_id}, {'$set': update_data})
        if result.matched_count:
            customer = customer_collection.find_one({'_id': obj_id})
            return jsonify(customer_serializer(customer))
        return jsonify({"error": "Customer not found"}), 404

    elif request.method == 'DELETE':
        result = customer_collection.delete_one({'_id': obj_id})
        if result.deleted_count:
            return jsonify({"message": "Customer deleted"})
        return jsonify({"error": "Customer not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
