Project: English Vocabulary Learning App
========================================

Branch Naming and Workflow
--------------------------

We follow a structured branching strategy to ensure smooth collaboration and avoid conflicts. Below are the branch naming conventions for different parts of the project:

### Main Branches:

*   **main-backend**: This is the primary branch for backend development. All finalized backend code is merged here.
    
*   **main-frontend**: This is the primary branch for frontend development. All finalized frontend code is merged here.
    
*   **main-mobile**: This is the primary branch for mobile development. All finalized mobile code is merged here.
    

### Feature Branches:

To avoid conflicts during development, always create a new feature branch based on the main branch you are working on.

*   ```bash
     checkout -b feature/backend/your-feature-name
    ```
    - Example: feature/backend/user-authentication
    
*   ```bash
    checkout -b feature/frontend/your-feature-name
    ```
    - Example: feature/frontend/user-dashboard
    
*   ```bash
    checkout -b feature/mobile/your-feature-name
    ```
    - Example: feature/mobile/user-profile
Commit Message Guidelines
-------------------------

Clear and consistent commit messages help maintain a clean project history. Follow these guidelines when writing commit messages:

### Structure:

**\[Tag\]** : Brief description of what was done

### Tags:

*   **\[Feat\]**: When adding a new feature.
    
*   **\[Fix\]**: For bug fixes.
    
*   **\[Refactor\]**: For code restructuring or improvements without adding new features.
    
*   **\[Docs\]**: For documentation updates.
    
*   **\[Style\]**: For formatting, spacing, and style changes (non-functional updates).
    
*   **\[Test\]**: For adding or updating tests.
    
*   **\[Chore\]**: For maintenance tasks such as dependency updates.
    

### Examples:

*   \[Feature\]: Add user authentication to backend
    
*   \[Fix\]: Resolve button misalignment on mobile
    
*   \[Refactor\]: Optimize query performance in dashboard
    
*   \[Docs\]: Update API documentation for lesson creation
    

By following this structure and naming convention, we ensure a smooth development workflow and maintain clear project history.
