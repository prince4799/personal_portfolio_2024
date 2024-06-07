//upgraded roate texts ===================================================================================================================
const dynamicTextsContainer = document.getElementById('dynamic-texts');
const texts = ['This is the first text.', 'This is the second text.', 'This is the third text.', 'And so on...'];

// Create text elements and add them to the container
texts.forEach(text => {
  const pElement = document.createElement('p');
  pElement.textContent = text;
  dynamicTextsContainer.appendChild(pElement);
});

// Define the animation parameters
const animationDuration = 5; // in seconds
const animationDelay = 2; // in seconds

// Add the animation to each text element
const textElements = Array.from(dynamicTextsContainer.querySelectorAll('p'));
textElements.forEach((textElement, index) => {
  const animationDelayValue = index * animationDelay;
  const animation = textElement.animate(
    [
      { opacity: 0, transform: 'translateY(100%)' },
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 1 },
      { opacity: 0, transform: 'translateY(-100%)' }
    ],
    {
      duration: animationDuration * 1000, // convert to milliseconds
      delay: animationDelayValue * 1000, // convert to milliseconds
      iterations: Infinity
    }
  );
});

//===================================================================================================================
