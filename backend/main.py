from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from faker import Faker
import random

app = Flask(__name__)
CORS(app)

fake = Faker('it_IT')
books = []
next_id = 1

GENRES = [
    "Romanzo",
    "Giallo",
    "Fantasy",
    "Fantascienza",
    "Saggistica",
    "Storia",
    "Biografia",
    "Poesia"
]


def generate_books(n=20):
    global next_id
    for _ in range(n):
        book = {
            "id": next_id,
            "titolo": fake.sentence(nb_words=3).rstrip('.'),
            "autore": f"{fake.first_name()} {fake.last_name()}",
            "anno": random.randint(1900, 2025),
            "genere": random.choice(GENRES)
        }
        books.append(book)
        next_id += 1


@app.route('/api/libri', methods=['GET'])
def get_libri():
    return jsonify(books), 200


@app.route('/api/libri/<int:book_id>', methods=['DELETE'])
def delete_libro(book_id):
    global books
    original_len = len(books)
    books = [b for b in books if b['id'] != book_id]
    if len(books) == original_len:
        return jsonify({"error": "Book not found"}), 404
    return jsonify({"message": "Book deleted"}), 200


@app.route('/api/libri', methods=['DELETE'])
def delete_all_libri():
    global books, next_id
    books = []
    next_id = 1
    return jsonify({"message": "All books deleted"}), 200


if __name__ == '__main__':
    # Genera circa 20 libri all'avvio
    generate_books(20)
    app.run(host='0.0.0.0', port=5000, debug=True)
