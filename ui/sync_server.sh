#!/usr/bin/env sh

ROOT=../..
HOST="94.237.38.133"
USER=root
SSH=ssh.exe

KEYS=${ROOT}/meow
KNOW=${ROOT}/known-hosts

if ! [ -f ${KEYS} ]; then
  echo "Key does not exist: ${KEYS}"
  exit 2
fi

if ! [ -f ${KNOW} ]; then
  echo "Known UserKnownHostsFile not found!: ${KEYS}"
  exit 3
fi

rsync -r \
  -avzq -e "${SSH} -i ${KEYS} -o 'UserKnownHostsFile=${KNOW}'" \
  ./build ${USER}@${HOST}:/opt/frontend

rsync \
  -avzq -e "${SSH} -i ${KEYS} -o 'UserKnownHostsFile=${KNOW}'" \
  ./ui.service ${USER}@${HOST}:/lib/systemd/system/frontend.service

${SSH} -q -i ${KEYS} -o "UserKnownHostsFile=${KNOW}" ${USER}@${HOST} -t 'systemctl daemon-reload && systemctl restart frontend'