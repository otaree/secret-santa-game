# Secret Santa Game

The Secret Santa Game is a Node.js application that allows you to organize and run a Secret Santa gift exchange event. Participants are randomly assigned a secret gift recipient, ensuring that each person has a surprise gift to receive.

## Prerequisites

- Node.js 18 (or a compatible version)
- NPM (Node Package Manager)

## Installation

1. Clone the repository or download the source code.
2. Open a terminal and navigate to the project directory.
3. Run `npm install` to install the dependencies.

## Usage

### Running the Program

To start the Secret Santa Game program, follow these steps:

1. Clone the repository or download the source code.
2. Open a terminal and navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. In the root of the project, you will find an `index.js` file. Open it in a text editor.
5. In `index.js`, locate the `assignSecretSanta` function call. It takes two arguments: the path to the employee list CSV file and the path to the previous year's Secret Santa CSV file.
6. Replace the placeholders for the paths with the actual file paths on your system.
7. Save the changes to `index.js`.
8. In the terminal, run the following command to start the Secret Santa Game program:

   ```shell
   npm start

This will run the application and provide instructions on how to proceed with the Secret Santa gift exchange.

9. Once the program completes, it will generate a Secret Santa CSV file in the root of the project with the filename secret-santa-<current year>.csv. For example, if the current year is 2023, the generated file will be named secret-santa-2023.csv. This file will contain the assigned Secret Santa pairs.

This will run the application and provide instructions on how to proceed with the Secret Santa gift exchange.

### Running the Tests

The Secret Santa Game project includes test cases to ensure the functionality is working as expected. To run the tests, use the following command:

```shell
npm run test
```

This will execute the test suite and display the test results in the console.

## Assigning Secret Santa Logic

The `assignSecretSanta` function is responsible for assigning Secret Santa pairs to a list of employees while considering the constraint that an employee cannot be assigned to the same secret child as in the previous year's Secret Santa event.

Here's an overview of the logic:

1. Create a copy of the employee list as a list of available employees.
2. Shuffle the available employees to randomize the assignment order.
3. Initialize an empty list to store the Secret Santa assignments.
4. Iterate through each employee in the employees list.
5. For each employee, find a valid secret child (another employee) to assign as their Secret Santa recipient.
6. To find a valid secret child, consider the previous year's assignments and the remaining available employees.
7. Exclude the previous year's secret child from the available options.
8. If a valid secret child cannot be found, backtrack and restart the assignment process.
9. Once a valid secret child is found, add the employee and their assigned secret child to the list of assignments.
10. Remove the assigned secret child from the available employees list.
12. Return the list of Secret Santa assignments.

This logic ensures that each employee is assigned exactly one secret child, while also taking into account the previous year's assignments to avoid assigning the same secret child as before.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [project repository](https://github.com/your-username/secret-santa-game).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Acknowledgments

Special thanks to the contributors and open source projects that provided inspiration, guidance, and valuable resources for the Secret Santa Game.

## Contact

If you have any questions or need further assistance, please feel free to contact the project maintainer at [dinabandhu.chakraborty.jc@gmail.com](mailto:dinabandhu.chakraborty.jc@gmail.com).

Enjoy the Secret

 Santa Game!