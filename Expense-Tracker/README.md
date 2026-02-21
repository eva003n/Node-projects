# Expense Tracker CLI

A simple command‑line tool to record, list, summarize, and delete daily
expenses --- directly from your terminal.
[Project URL](https://roadmap.sh/projects/expense-tracker)


## 🚀 Features

-   Add expenses with description and amount\
-   List all expenses
-   Get total spending summary
-   Filter summary by month
-   Delete expenses by ID
-   Simple & lightweight

## 🚀 Additional features
- Add expense categories and allow users to filter expenses by category.

- Allow users to set a budget for each month and show a warning when the user exceeds the budget.

- Allow users to export expenses to a CSV file.

------------------------------------------------------------------------
------------------------------------------------------------------------

## ⚙️ Installation

Clone the project:

``` bash
git clone https://github.com/eva003n/Expense-Tracker-CLI.git
```

Link the CLI globally (so you can run `expense-tracker` anywhere):

``` bash
pnpm link
```


> If PNPM complains about a bin folder, run:
>
> ``` bash
> pnpm setup
> ```

Confirm setup was successfull, will output absolute path to directory

```bash
pnpm bin -g
```
------------------------------------------------------------------------

## 🧾 Usage

### Intialize expense-tracker
This command should be run before any other commands
```bash
expense-tracker init
```

### Show help

Displays all available commands:

``` bash
expense-tracker --help
```

or simply:

``` bash
expense-tracker
```

### ➕ Add an expense

``` bash
expense-tracker add --description "Lunch" --amount 20
```

### 📋 List all expenses

``` bash
expense-tracker list
```

### 📊 Summary

``` bash
expense-tracker summary
```

Summary by month:

``` bash
expense-tracker summary --month 8
```

### ❌ Delete an expense

``` bash
expense-tracker delete --id 2
```

------------------------------------------------------------------------

## 🛠 Example Output

    $ expense-tracker add --description "Lunch" --amount 20
    # Expense added successfully (ID: 1)

    $ expense-tracker list
    # ID  Date        Description   Amount
    # 1   2024-08-06  Lunch         $20

    $ expense-tracker summary
    # Total expenses: $20

------------------------------------------------------------------------

