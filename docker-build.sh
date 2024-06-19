# Ensure the script exits if any command fails
set -e

# Check if the image name argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <image-name>"
  exit 1
fi

# Assign the image name argument to a variable
IMAGE_NAME=$1

# Load environment variables from the .env.local file
export $(grep -v '^#' .env.local | xargs)

# Build the Docker image with build arguments
docker build \
    --build-arg OPENAI_API_KEY=$OPENAI_API_KEY \
    --build-arg OPENAI_MECE_ORG_OPS_ID=$OPENAI_MECE_ORG_OPS_ID \
    --build-arg OPENAI_MECE_OPS_ACTIVITY_ID=$OPENAI_MECE_OPS_ACTIVITY_ID \
    --build-arg OPENAI_RSS_FILTERING_ID=$OPENAI_RSS_FILTERING_ID \
    --build-arg OPENAI_APP_QUESTIONS_ID=$OPENAI_APP_QUESTIONS_ID \
    --build-arg OPENAI_SAT_APP_ID=$OPENAI_SAT_APP_ID \
    -t $IMAGE_NAME .
