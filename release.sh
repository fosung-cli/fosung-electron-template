#!/usr/bin/env sh

# Release branch
master="master"
prefix="fosung_v"

git pull origin $master
echo "Current pull origin $master."

# Auto generate version number and tag
standard-version -p $release --tag-prefix $prefix

git push --follow-tags origin $master

echo "Git push origin $master"
echo "Release finished."
