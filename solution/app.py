import os
from flask import Flask, render_template, request, url_for

app = Flask(__name__)


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/image", methods=["GET"])
def image():
    return render_template("image.html")

@app.route("/clipdrop", methods=["GET"])
def clipdrop():
    return render_template("clipdrop.html")



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
