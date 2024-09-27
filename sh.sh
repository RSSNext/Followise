if git diff --quiet @{1.day.ago} HEAD -- ':!.github'; then
  echo "should_run=false" >>$GITHUB_OUTPUT
  echo "SHOULD_RUN=false" >>$GITHUB_ENV
  echo "no changes detected"
else
  echo "should_run=true" >>$GITHUB_OUTPUT
  echo "SHOULD_RUN=true" >>$GITHUB_ENV
  echo "changes detected"
fi
