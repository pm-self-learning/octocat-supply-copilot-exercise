# **GitHub Copilot Agent Mode exercise**

This app will be used to show the following Copilot features:

- **Agent Mode and Vision**: generate a fairly complex UI updated (add the Cart functionality to the site) all with a natural language prompt and an image
- **Unit Testing**: run and generate unit tests to improve coverage
- **Security**: analyze the code for security vulnerabilities and suggest fixes


### **Description**

- **About the App:** This is a modern TypeScript web-app with separate API and Frontend (React) projects that you will enhance with Copilot Agent Mode, and Vision.
- **Why:** Demonstrate how Copilot can analyze and enhance existing code automatically, understand images, vulnerabilities and testing.

- **Local vs Codespaces:**  
  - This demo can work in a Codespace.
  - The visibility of the API port (3000) must be set to `public`. This is set in the port attributes of the devcontainer file, but it seems that this config setting isn't always obeyed. Check before running the app! If you forget this, you will see CORS errors when the frontend tries to reach the API.
  

### **Building, Running and Debugging the code**

Refer to [the build docs](./build.md).

### **Exercise: Using Vision and Agent to Generate Cart Functionality**  

- **What to show:** "Vibe coding" using Agent Mode and Vision to complete complex tasks.
- **Why:** Demonstrate how Copilot Vision can detect design and how Agent can understand a codebase and create complex changes over multiple files.
- **How:**  
 
  1. Open Copilot and switch to "Ask" mode. Add the [`plan`](../.github/prompts/plan.prompt.md) prompt to the chat.
  1. Attach the [cart image](../docs/design/cart.png) using the paperclip icon or drag/drop to add it to the chat.
  1. Enter the following prompt:
    ```txt
    I need to implement a simple Cart Page. I also want a Cart icon in the NavBar that shows the number of items in the Cart.
    ```
   Copilot would suggest changes and plan the components to add/modify and even ask clarifying questions.
  2. Answer some of the questions if you want to refine the plan.
  3. Switch to "Agent" mode in Copilot Chat. Switch to `Claude 3.7 Sonnet` (a good implementation model) and enter this prompt:
    ```txt
    Implement the changes.
    ```
  4. See how Copilot is making the changes in the files and you can Keep/reject each one.
  5. Accept Copilot’s suggested fixes.
  6. Go back to the Frontend app. Navigate to Products. Add items to the cart (note the icon updating). Click on the Cart icon to navigate to the Cart page. See the total, and adding/removing items from the cart.



### **Generate unit tests for the Cart functionality**  

- **What to show:** Generate unit tests with the help of GitHub Copilot.
- **Why:** Demonstrate how Copilot can generate unit tests for the new Cart functionality.
- **How:**  
  1. Switch to Agent mode
  2. Ask Copilot to `generate unit tests for the Cart functionality and the icon`
  3. Show the generated tests
  4. Accept the changes
  5. Ask Copilot to run the tests
1. 

### **Enhancing Unit Tests and Coverage**  

- **What to show:** Copilot generating a multiple tests, exucuting them, analyzing coverage and self-healing.
- **Why:** Show Copilot’s ability to quickly and easily generate tests, validate them, self-heal and analyze coverage.
- **How:**  
  1. Ask Copilot to `run tests, analyze coverage and add missing Branch tests to include tests for untested scenarios`
  1. Show Agent working on the tests and adding new tests for the API branch route
  1. Show Copilot "self-healing" (if tests fail)
  1. Accept the changes
  1. Ask Copilot to `add tests for the Product route` to show generation of new tests
  
### **Copilot and App Security**

- **What to show:** Copilot’s ability to understand and remediate security vulnerabilities
- **Why:** Demonstrate that Copilot can be used to scale AppSec by bringing security expertise to Developers directly.
- **How:**  
  1. Open Copilot Chat and switch to `Ask` mode.
  1. Ask Copilot to `analyze @workspace and check if there are obvious security vulnerabilities`
  1. You should see issues like:
    - Cross-site Scripting (XSS) vulnerability
    - Command Injection Vulnerability
    - Insecure CORS Configuration
    - Missing Security Headers
    - Insecure Authentication Implementation
  1. Chat with Copilot to address one of these issues: `generate a fix for ...`

## **Key Takeaways**  

- Agent Mode handles multi-step changes across multiple files — saving time.
- Vision enables Copilot to understand images
- Command execution allows Copilot to self-heal and run commands

