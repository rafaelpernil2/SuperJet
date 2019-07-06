# SuperJet
An Oracle Jet web application for trying out different functionalities. It mimicks the behaviour of [rafaelpernil2/FezComicsCliente](https://github.com/rafaelpernil2/FezComicsCliente), connecting with a REST API ([rafaelpernil2/FezComicRESTPy](https://github.com/rafaelpernil2/FezComicRESTPy)). Also, this project is Dockerized for further CI/CD management.
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)
## Installation
**Requirements:**
* [**Docker**](https://www.docker.com/)
* [**rafaelpernil2/FezComicRESTPy**](https://github.com/rafaelpernil2/FezComicRESTPy)

***Additional requirements without using Docker:***
* [**Node.js**](https://nodejs.org/)

**Steps without Docker:**

Install Oracle Jet 7.0.0 or higher
```
$ npm install -g @oracle/ojet-cli@latest
```
Go to the folder where you cloned this repository and install the dependencies
```
$ npm install
```

**Steps using Docker:**

Simply build the container
```
$ docker build -t <some-tag> .
```

## Usage
**Usage without Docker**

Deploy in local using the following command
```
$ ojet serve
```

**Usage with Docker**

Run the created container
```
$ docker run -p 8100:8100 -d <some-tag>
```

## Contributing
There is no plan regarding contributions in this project
## Credits
This web application has been developed by myself:

**Rafael Pernil Bronchalo** - *Developer* 

* [github/rafaelpernil](https://github.com/rafaelpernil2)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
