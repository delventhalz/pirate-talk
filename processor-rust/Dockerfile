FROM rust:1

RUN apt-get update && apt-get install -y unzip libzmq3-dev

# For Building Protobufs
RUN curl -OLsS https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-linux-x86_64.zip \
 && unzip protoc-3.5.1-linux-x86_64.zip -d protoc3 \
 && rm protoc-3.5.1-linux-x86_64.zip
RUN apt-get update && apt-get install -y protobuf-compiler

# Cache dependencies
WORKDIR /pirate-talk
RUN USER=root cargo new --bin processor-rust
WORKDIR /pirate-talk/processor-rust
COPY Cargo.toml Cargo.lock ./
RUN cargo build

ENV PATH=$PATH:/pirate-talk/processor-rust/target/debug/
