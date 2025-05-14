# **GitHub Copilot Customization Exercise**

This exercise will show you how to customize GitHub Copilot to improve its code generation capabilities by using instruction files and prompt files.

## **Features to Learn**

- **Instruction Files**: Create and use instruction files to define coding standards and project requirements
- **Prompt Files**: Create reusable prompts for common tasks
- **Settings**: Configure Copilot using VS Code settings

## **Description**

- **About the Exercise**: Learn how to make GitHub Copilot follow your coding practices and standards using custom instructions and prompt files.
- **Why**: Standardize Copilot's output across your team, improve code quality, and ensure consistency.

## **Prerequisites**

- GitHub Copilot extension installed and activated in VS Code
- Basic understanding of VS Code settings

## **Getting Started**

Ensure you have the GitHub Copilot extension installed and configured in VS Code before starting the exercise.

## **Exercise 1: Setting Up an Instruction File**

### **What You'll Learn**
Create a `.github/copilot-instructions.md` file to define project-wide coding standards for GitHub Copilot.

### **Steps**:

1. First, ensure [instruction files](vscode://settings/github.copilot.chat.codeGeneration.useInstructionFiles) are enabled in VS Code settings:
    ![VS Code Settings for Instruction Files](../docs/images/instruction-files-setting.png)
   
2. Create a `.github` directory at the root of your workspace if it doesn't exist:


3. Create a `copilot-instructions.md` file in the `.github` directory:

4. Copy the contents from [sample](../docs/sample-copilot-instructions.md) into your `copilot-instructions.md` file under the `.github` directory, and save it.

5. Test your instruction file by implementing a new feature with Copilot's help:
   - Open Copilot Chat, and select `Agent mode`. Use the following prompt:
     ```txt
     Create a new "Suppliers" feature that adds a suppliers link to the navigation bar and displays a list of suppliers fetched from the backend. The list should include the supplier name, and contact information
     ```
   - Review the generated code to verify it follows the instructions in your copilot-instructions.md file
   - Test the feature in your application

### **What You'll Learn**
Create targeted instruction files for specific file types using `.instructions.md` files.

### **Steps**:

1. Create a `.github/instructions` directory:
   ```bash
   # Create the instructions directory
   mkdir -p .github/instructions
   ```

2. Create a TypeScript-React specific instruction file:
   ```bash
   # Create a TypeScript-React instructions file
   touch .github/instructions/typescript-react.instructions.md
   ```

3. Add the following content with a front matter that applies to TypeScript and React files:
   ```markdown
   ---
   applyTo: "**/*.ts,**/*.tsx"
   ---
   # TypeScript and React Standards

   ## Component Structure
   - Use named exports for components
   - Group related components in the same directory
   - Keep component files under 250 lines of code
   - Create separate files for complex logic

   ## State Management
   - Use React Context for global state
   - Prefer useState for component-level state
   - Consider useReducer for complex state logic
   - Use custom hooks to share stateful logic

   ## Performance Optimization
   - Use React.memo for components that render often
   - Use useCallback for functions passed to child components
   - Use useMemo for expensive calculations
   - Add key props to list items with stable, unique IDs
   ```

4. Test your file-specific instructions by opening Copilot Chat and asking it to generate a React component:
   ```
   Create a ProductFilter component that allows users to filter products by category, price range, and rating
   ```

5. Verify that the generated code follows both your general and TypeScript-React specific instructions.

## **Exercise 3: Creating a Reusable Prompt File**

### **What You'll Learn**
Create a reusable prompt file for generating React components quickly.

### **Steps**:

1. Enable prompt files in VS Code settings:
   - Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
   - Type "Preferences: Open Settings (JSON)"
   - Add this setting to your `settings.json`:
     ```json
     "chat.promptFiles": true
     ```

2. Create a `.github/prompts` directory:
   ```bash
   # Create the prompts directory
   mkdir -p .github/prompts
   ```

3. Create a component generator prompt file:
   ```bash
   # Create a component generator prompt file
   touch .github/prompts/create-component.prompt.md
   ```

4. Add the following content:
   ```markdown
   ---
   mode: 'agent'
   tools: ['codebase']
   description: 'Generate a new React component'
   ---
   Your goal is to generate a new React component based on the project's best practices.

   Follow these requirements:
   * Use TypeScript for type safety
   * Create functional components with React hooks
   * Follow project naming conventions (PascalCase for components)
   * Add proper JSDoc comments
   * Include unit tests for the component
   * Use CSS modules for styling

   Ask for:
   1. Component name
   2. Component purpose/functionality
   3. Any props it should accept
   4. Any state it should manage

   Then generate:
   1. Component file (ComponentName.tsx)
   2. Test file (ComponentName.test.tsx) 
   3. CSS module file (ComponentName.module.css)
   ```

5. Test your prompt file:
   - Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
   - Type "Chat: Run Prompt"
   - Select your `create-component.prompt.md` file
   - Answer the questions Copilot asks you
   - Review the generated component files

6. Alternatively, use the prompt file in chat by typing `/create-component` in the Copilot Chat input field.

## **Exercise 4: Configuring Custom Instructions in Settings**

### **What You'll Learn**
Configure different types of custom instructions directly in VS Code settings.

### **Steps**:

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type "Preferences: Open Settings (JSON)"
3. Add these settings to your `settings.json`:
   ```json
   "github.copilot.chat.codeGeneration.instructions": [
     {
       "text": "Always add JSDoc comments to functions and components."
     },
     {
       "text": "In TypeScript always use interfaces over types when possible."
     }
   ],
   "github.copilot.chat.testGeneration.instructions": [
     {
       "text": "Use Vitest for writing unit tests."
     },
     {
       "text": "Include tests for error handling and edge cases."
     }
   ]
   ```

4. Test your code generation instructions by asking Copilot to generate a utility function:
   ```
   Create a utility function that formats currency values
   ```

5. Test your test generation instructions by asking Copilot to generate tests:
   ```
   Generate tests for a function that validates email addresses
   ```

## **Key Takeaways**

- **Custom Instructions**: GitHub Copilot can follow your coding standards and project requirements when provided with clear instructions.
- **Reusable Prompts**: Create prompt files for common tasks to standardize code generation across your team.
- **Configuration Flexibility**: Choose between instruction files, prompt files, and settings based on your needs.
- **Improved Code Quality**: Properly configured, Copilot can generate code that follows your team's best practices.

## **Next Steps**

- Create instruction files for different parts of your codebase
- Share your instruction files with your team
- Create a library of prompt files for common tasks
- Experiment with different combinations of instructions and prompts
