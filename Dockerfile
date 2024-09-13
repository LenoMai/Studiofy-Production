# React Dependencies
FROM node:18.17.0 AS build

# Set the working directory
WORKDIR /app

# copy package.json and package-lock.json to /app
COPY package*.json ./

RUN npm install

# copy react source code
COPY . .

RUN npm run build

# Python Dependencies
FROM python:3.9

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

# Copy Build Output files
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public

# expose the port the app will run on
EXPOSE $PORT

ENV PYTHONUNBUFFERED=1

# run flask through gunicorn
CMD /bin/sh -c "gunicorn -w 4 -b 0.0.0.0:${PORT} app:app"
