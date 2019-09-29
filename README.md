# PORT MAPPER

This is a port mapper console utility written using JavaScript (NodeJS) as university lab project.

<p align="center"><img src="/docs/demo.gif?raw=true"/></p>

## Basic usage

Help message:

```bash
$ port-mapper -h
Usage: port-mapper [options] <host> <ports>

Options:
  -o, --open     filter open ports
  -j, --json     json output
  -v, --version  output the version number
  -h, --help     output usage information
```
  
Check 80 port:

```bash
$ port-mapper 127.0.0.1 80
```
  
Check ports from 0 to 1023:

```bash
$ port-mapper 127.0.0.1 0-1023
```

Show only open ports:

```bash
$ port-mapper 127.0.0.1 0-1023 --open
```

Supress any output, but json result:

```bash
$ port-mapper 127.0.0.1 0-1023 --json
```

## Build from source

```bash
# clone repository
$ git clone https://github.com/GLEBR1K/port-mapper.git

# go into the source folder
$ cd port-mapper

# build for windows
$ npm run build:win 
# or linux
$ npm run build:linux
# or mac
$ npm run build:mac

# executable files placed into build folder
$ ls build/
```
