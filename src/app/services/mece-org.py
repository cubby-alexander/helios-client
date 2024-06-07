from openai import OpenAI
import sys
import json

client = OpenAI()

# Assistant instructions are stored in OpenAI API Dashboard
def generate_mece_list(user_message, assistant_id):

    thread = client.beta.threads.create()

    message = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=user_message
    )

    run = client.beta.threads.runs.create_and_poll(
        thread_id=thread.id,
        assistant_id=assistant_id,
    )

    if run.status == 'completed':
        messages = client.beta.threads.messages.list(
            thread_id=thread.id
        )
        return [message.to_dict() for message in messages.data]
    else:
        return run.status

if __name__ == "__main__":
    if len(sys.argv) > 1:
        user_message = sys.argv[1]
    else:
        user_message = "default message"
    if len(sys.argv) > 2:
        assistant_id = sys.argv[2]
    else:
        assistant_id = "default message"
result = generate_mece_list(user_message, assistant_id)
print(json.dumps(result))
