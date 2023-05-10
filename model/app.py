import requests
import joblib
import torch
import io
from PIL import Image
import cv2
import argparse
import numpy as np
import tensorflow as tf
from re import DEBUG, sub
from flask import Flask, render_template, request, redirect, send_file, url_for, Response
from werkzeug.utils import secure_filename, send_from_directory
import os
import subprocess
from subprocess import Popen
# from damage_detector import DamageDetector
import re
import requests
import shutil
import time
import glob
from sklearn.preprocessing import LabelEncoder


app = Flask(__name__)


@app.route("/")
def hello_world():
    return render_template('index.html')


model = joblib.load('model/drug-effect-prediction.h5')
le = joblib.load('model/labelencoder.h5')
tokenizer = joblib.load('model/tokenizer.h5')


def getReactions(drugName):
    url = f'https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:"{drugName}"'
    results = requests.get(url).json()['results']

    substancename = set()
    for res in results:
        for drug in res["patient"]["drug"]:
            if drug.get("activesubstance"):
                substancename.add(
                    drug.get("activesubstance").get("activesubstancename"))
    substancename = list(substancename)
    print(substancename)
    x = tokenizer.texts_to_sequences([substancename])
    x = tf.keras.preprocessing.sequence.pad_sequences(x, maxlen=64)
    y = model.predict(x)
    y = le.inverse_transform(y)
    return y


print(getReactions("humira"))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Flask app exposing yolov5 models")
    parser.add_argument("--port", default=5000, type=int, help="port number")
    args = parser.parse_args()
    app.run(host="0.0.0.0", port=args.port, debug=True)
