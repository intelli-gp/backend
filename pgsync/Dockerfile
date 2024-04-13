FROM python:slim-bullseye

WORKDIR /app

COPY . .

RUN chmod +x ./entrypoint.sh

RUN pip install pgsync

RUN apt update \
    && apt install -y moreutils \
    && apt install -y jq \
    && apt install -y wait-for-it

ENTRYPOINT ["bash", "./entrypoint.sh"]
