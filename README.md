# Sawtooth PirateTalk

This is an example Sawtooth application, built for blockchain presentations at
Open Source North and MidwestJS 2018. It uses a simple fun app to showcase many
parts of the Sawtooth ecosystem:
 - Javascript client transaction submission
 - REST API state delta subscriptions
 - Javascript, Python, and Rust transaction processors
 - Seth Solidity smart contracts (WIP)
 - Sabre WASM smart contracts (WIP)

## Contents

- [Usage](#usage)
    * [Docker Cheatsheet](#docker-cheatsheet)
        - [Building/Destroying](#building-destroying)
        - [Starting/Stopping](#starting-stopping)
        - [Running commands from within a container](#running-commands-from-within-a-container)
- [Slides](#slides)
- [License](#license)

## Usage

This entire app can be run just using only
[Docker](https://www.docker.com/community-edition). Simply follow the install
instructions specific to your OS, and then run:

```bash
git clone https://github.com/delventhalz/pirate-talk.git
cd pirate-talk/
docker-compose up
```

This will take a _long_ time to build and install the first time, 30 minutes or
more. In the future it will be much faster, 30 seconds or less.

Once running, you can navigate to [localhost:8080](http://localhost:8080) to
use the client and submit transactions. Submitted transactions should then
appear in your console as the transaction processors handle them.

### Docker Cheatsheet

Here is a list of useful docker commands you might use when working with this
project. Note that most of these can be entered from a separate terminal while
`docker-compose up` is still running.

#### Building/Destroying

Build and start all components:

```bash
docker-compose up
```

Stop with `ctrl-C`, and/or stop and destroy all components:

```bash
docker-compose down -v
```

#### Starting/Stopping

Restart a particular component (e.g. _"pirate-tp"_, other components listed in
`docker-compose.yaml`):

```bash
docker restart pirate-tp
```

Stop a component:

```bash
docker stop pirate-tp
```

Start a stopped component:

```bash
docker start pirate-tp
```

#### Running commands from within a container

It is possible to enter a Docker container to use bash. This is sometimes
useful for various development tasks, especially if you do not have
dependencies installed locally. Note that within a Docker container URLs are
now based on the name of the service in `docker-compose.yaml`. For example, the
Sawtooth REST API would go from `http://localhost:8008` to
`http://rest-api:8008`.

Entering a container with bash:

```bash
docker exec -it pirate-tp bash
```

Exiting a container

```bash
exit
```

## Slides

The slides for the June 2018 Sawtooth App Development presentation are
available online in a variety of formats:
 - [Google Slides](https://docs.google.com/presentation/d/1cSSimL-evPxT-8DDxjvKwKFNbxgNklzQoxVhOLBWvRs/edit?usp=sharing)
 - [MS PowerPoint](presentation/blockchain_apps_08_2018.pptx)
 - [Open Doc](presentation/blockchain_apps_08_2018.odp)
 - [PDF](presentation/blockchain_apps_08_2018.pdf)

## License

The source code of this project is licensed for reuse under the
[Apache License Version 2.0](LICENSE).

Slides and original written material are licensed under
[Creative Commons Attribution 4.0](http://creativecommons.org/licenses/by/4.0/).
