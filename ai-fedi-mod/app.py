import os
from flask import Flask, render_template, request, url_for

app = Flask(__name__)


@app.route("/", methods=("GET", ))
def index():
    # Simply render the template
    return render_template("index.html")


@app.route("/image", methods=("GET", "POST"))
def image():
    if request.method == "POST":
        image = request.form["image"]
        response = openai.Image.create(prompt=image, n=1, size="1024x1024")
        return redirect(url_for("image", result=response['data'][0]['url']))

    result = request.args.get("result")
    return render_template("image.html", result=result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
