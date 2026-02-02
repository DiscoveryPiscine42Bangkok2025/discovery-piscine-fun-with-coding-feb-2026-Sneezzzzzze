#!/bin/bash

# $# number arguments
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
fi

if [ $# -gt 3 ]; then
    echo "3 Maximum"
else

    count=0
# $@ -> arguments ex apple banana 
    for arg in "$@"; do
        if [ $count -lt 3 ]; then
            echo "$arg"
            count=$((count + 1))
        else
            break
        fi
    done
fi
