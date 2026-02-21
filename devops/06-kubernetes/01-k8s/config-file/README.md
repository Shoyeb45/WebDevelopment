# Details abou the config files

## [cluster-config.yml](./cluster-config.yml)
- This file is used to create cluster and nodes using `kind`.
- Command: `kind create clusters --config cluster-config.yml --name some-name`

## [pod-mainfest.yml.yml](./pod-mainfest.yml)
- This file is used to create pods using `kubectl`.
- Command: `kubectl apply -f pod-mainfest.yml`

