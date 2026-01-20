#!/bin/bash
cd /home/kavia/workspace/code-generation/digital-clock-web-app-202265-202274/digital_clock_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

