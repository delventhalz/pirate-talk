# Copyright 2018 Intel Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ------------------------------------------------------------------------------

FROM ubuntu:xenial

ENV GOPATH=/pirate-talk/seth/processor
ENV PATH=$PATH:/pirate-talk/seth/processor/bin:/pirate-talk/seth/bin:/usr/lib/go-1.9/bin
WORKDIR $GOPATH/src/seth_tp

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 8AA7AF1F1091A5FD \
 && echo 'deb http://repo.sawtooth.me/ubuntu/1.0/stable xenial universe' >> /etc/apt/sources.list \
 && apt-get update \
 && apt-get install -y -q \
    git \
    golang-1.9-go \
    libssl-dev \
    libzmq3-dev \
    openssl \
    python3 \
    python3-grpcio-tools=1.1.3-1 \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

RUN go get -u \
    github.com/btcsuite/btcd/btcec \
    github.com/golang/mock/gomock \
    github.com/golang/mock/mockgen \
    github.com/golang/protobuf/proto \
    github.com/golang/protobuf/protoc-gen-go \
    github.com/jessevdk/go-flags \
    github.com/pebbe/zmq4 \
    github.com/satori/go.uuid \
    golang.org/x/crypto/ripemd160 \
    gopkg.in/fatih/set.v0

RUN go get github.com/hyperledger/sawtooth-sdk-go \
 && cd $GOPATH/src/github.com/hyperledger/sawtooth-sdk-go \
 && go generate

COPY . /pirate-talk/seth

RUN seth-protogen go

ENV GOPATH=$GOPATH:/pirate-talk/seth/burrow:/pirate-talk/seth/common
RUN go build -o /pirate-talk/seth/processor/bin/seth-tp

WORKDIR /pirate-talk/seth/processor

RUN pkg_dir=/project/build/debs/ \
 && CHANGELOG_DIR="debian/usr/share/doc/sawtooth-seth" \
 && if [ -d "debian" ]; then rm -rf debian; fi \
 && mkdir -p $pkg_dir \
 && mkdir -p debian/DEBIAN \
 && mkdir -p $CHANGELOG_DIR \
 && cp packaging/ubuntu/* debian \
 && cp debian/changelog $CHANGELOG_DIR \
 && mv debian/changelog $CHANGELOG_DIR/changelog.Debian \
 && gzip --best $CHANGELOG_DIR/changelog \
 && gzip --best $CHANGELOG_DIR/changelog.Debian \
 && mv debian/control debian/DEBIAN \
# && mv debian/postinst debian/DEBIAN \
 && PACKAGENAME=$(awk '/^Package:/ { print $2 }' debian/DEBIAN/control) \
 && PACKAGEVERSION=$(dpkg-parsechangelog -S version -l $CHANGELOG_DIR/changelog.gz) \
 && PACKAGEARCH=$(dpkg-architecture -qDEB_BUILD_ARCH) \
 && mkdir debian/usr/bin \
 && cp -R bin/seth-tp debian/usr/bin \
# && cp -R packaging/systemd/* debian/ \
 && fakeroot dpkg-deb --build debian \
 && mv debian.deb $pkg_dir/"${PACKAGENAME}_${PACKAGEVERSION}_${PACKAGEARCH}.deb"

FROM ubuntu:xenial

RUN mkdir /debs

COPY --from=0 /project/build/debs/sawtooth-seth-tp_*amd64.deb /debs

RUN apt-get update \
 && apt-get install -y -q \
    dpkg-dev \
 && cd /debs \
 && dpkg-scanpackages . /dev/null | gzip -9c > Packages.gz \
 && echo "deb file:/debs ./" >> /etc/apt/sources.list \
 && apt-get update \
 && apt-get install sawtooth-seth-tp -y -q --allow-unauthenticated \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*
