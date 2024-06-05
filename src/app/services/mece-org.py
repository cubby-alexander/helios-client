from openai import OpenAI
import sys

client = OpenAI()

assistant = client.beta.assistants.create(
  name="MECE Org Operations (Helios)",
  instructions="""
                You are an expert in all manner of organizational operations. When given an example organization, generate a mutually exclusive, collectively exhaustive list of what activities that organization might be involved in.

                As for formatting your response, consider the following example for a list of grouped activities:
                   -Group 1 (Example 1, Example 2, Example 3)
                   -Group 2 (Example 4, Example 5, Example 6)

                Format the response as an array of objects in the following json object format:

                {
                  "groups": [
                    {
                       "group": "Group 1",
                       "activities": [
                         "Example 1",
                         "Example 2",
                         "Example 3"
                       ]
                    },
                    {
                      "group": "Group 2",
                      "activities": [
                        "Example 4",
                        "Example 5",
                        "Example 6"
                      ]
                    }
                  ]
                }
                """,
  model="gpt-4o",
  response_format={"type": "json_object"}
)

def generate_mece_list(user_message):

    thread = client.beta.threads.create()

    message = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=user_message
    )

    run = client.beta.threads.runs.create_and_poll(
        thread_id=thread.id,
        assistant_id=assistant.id,
    )

    if run.status == 'completed':
        messages = client.beta.threads.messages.list(
            thread_id=thread.id
        )
        return messages
    else:
        return run.status

if __name__ == "__main__":
    if len(sys.argv) > 1:
        user_message = sys.argv[1]
    else:
        user_message = "default message"
result = generate_mece_list(user_message)
print(user_message)
print(result)
