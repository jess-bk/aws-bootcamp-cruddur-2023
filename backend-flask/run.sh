#!/bin/bash
export PORT=4567
python3 -m flask run --host=0.0.0.0 --port=$PORT