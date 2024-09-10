# React Dependencies
FROM node:16 as build

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
EXPOSE 5000

# run flask through gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
