FROM rust:1.26

RUN apt-get update && apt-get install -y unzip libzmq3-dev

# For Building Protobufs
RUN curl -OLsS https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-linux-x86_64.zip \
 && unzip protoc-3.5.1-linux-x86_64.zip -d protoc3 \
 && rm protoc-3.5.1-linux-x86_64.zip
RUN apt-get update && apt-get install -y protobuf-compiler

WORKDIR /pirate-talk/sabre
RUN USER=root cargo new --bin tp

WORKDIR /pirate-talk/sabre/tp
COPY tp/Cargo.toml tp/Cargo.lock ./
RUN cargo build

WORKDIR /pirate-talk/sabre
COPY . .

WORKDIR /pirate-talk/sabre/tp
RUN cargo build

ENV PATH=$PATH:/pirate-talk/sabre/tp/target/debug/
