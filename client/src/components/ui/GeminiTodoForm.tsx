import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { BASE_URL } from "../../App";

const GeminiTodoForm = () => {
  const [sentence, setSentence] = useState("");
  const queryClient = useQueryClient();

  // Mutation to create tasks in the list
  const { mutate: createTodo, isPending: isCreating } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: async (todoBody: string) => {
      try {
        const res = await fetch(BASE_URL + `/todos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: todoBody }),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // Invalidate the todos query to refetch data
    },
    onError: (error: any) => {
      alert(error.message);
    },
  });

  // Function to fetch AI response
  const fetchGeminiResponse = async (sentence: string) => {
    try {
      const res = await fetch(BASE_URL + `/gemini-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: sentence }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response from Gemini AI");
      }

      return data.response; // Assuming AI response is in the `response` field
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sentence.trim()) {
      alert("Please enter a sentence");
      return;
    }

    try {
      // Get AI-generated response
      const aiResponse = await fetchGeminiResponse(sentence);

      // Add AI response to the task list
      createTodo(aiResponse);

      // Clear the input field
      setSentence("");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap={2}>
        <Input
          type="text"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          placeholder="Enter a sentence to generate tasks..."
        />
        <Button
          mx={2}
          type="submit"
          // isDisabled={isCreating}
          _active={{
            transform: "scale(.97)",
          }}
        >
          {isCreating ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
        </Button>
      </Flex>
    </form>
  );
};

export default GeminiTodoForm;
