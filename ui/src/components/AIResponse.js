import cocktailData from "../data.json";

const AIResponse = (message) => {
  if (message) {
    // Convert message to lowercase for case-insensitive comparison
    const lowerCaseMessage = message.toLowerCase();

    // Find the first cocktail whose name is in the message
    const foundCocktail = cocktailData.cocktails.find((cocktail) =>
      lowerCaseMessage.includes(cocktail.name.toLowerCase())
    );

    // Return the description if a cocktail is found
    if (foundCocktail) {
      const messageObject = {
        message: foundCocktail.description, // the message text
        sentTime: new Date().toLocaleTimeString(), // current time
        sender: "Goat",
        direction: "incoming",
        position: "single",
      };
      return messageObject;
    }
  }

  // Return a default message or null if no cocktail is found
  return message;
};

export default AIResponse;
