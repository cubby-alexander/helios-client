# Load environment variables from the .env.local file
export $(grep -v '^#' .env.local | xargs)

# Build the Docker image with build arguments
docker build \
    --build-arg OPENAI_API_KEY=$OPENAI_API_KEY \
    --build-arg OPENAI_MECE_ORG_OPS_ID=$OPENAI_MECE_ORG_OPS_ID \
    --build-arg OPENAI_MECE_OPS_ACTIVITY_ID=$OPENAI_MECE_OPS_ACTIVITY_ID \
    --build-arg OPENAI_RSS_FILTERING_ID=$OPENAI_RSS_FILTERING_ID \
    -t push_six .
