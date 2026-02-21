#! /usr/bin/env node

tokenizer(process.argv);

async function tokenizer(args) {
  if (!Array.isArray(args)) return;

  try {
    const parsedArgs = parser(args.slice(2));

    const data = await getGithubUserActivity(parsedArgs);
    displayGithubUserActivity(data);
    // process.exit9(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);

    process.exit(1);
  }
}

function parser(args) {
  if (Array.isArray(args) && args.length === 0)
    throw new Error(
      "Please provide a github username, run github-activity <username>"
    );

  return args;
}

async function getGithubUserActivity(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events`,
      {
        // headers: {
        //   accept: "application/json",
        // },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User ${username} not found`);
      } else {
        throw new Error(
          `Github API error ${response.statusText} with status ${response.status}`
        );
      }
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching github user activity: ${error.message}`);
    process.exit(1);
  }
}

function displayGithubUserActivity(githubEvents) {
  const events = {};
  let action;

  // group similar data
  githubEvents.forEach((event) => {
    const repo = event.repo.name || "Unknown repository";
    events[repo] = events[repo] || {};

    if (event.type === "PushEvent") {
      events[repo].commits = (events[repo].commits || 0) + 1;
    } else if (event.type === "PullRequestEvent") {
      events[repo].pullRequests = (events[repo].pullRequests || 0) + 1;
    } else if (event.type === "IssuesEvent") {
      events[repo].issues = (events[repo].issues || 0) + 1;
    } else if (event.type === "IssueCommentEvent") {
      events[repo].issueComments = (events[repo].issueComments || 0) + 1;
    } else if (event.type === "CreateEvent") {
      events[repo].creates = (events[repo].creates || 0) + 1;
    } else if (event.type === "ForkEvent") {
      events[repo].forks = (events[repo].forks || 0) + 1;
    } else if (event.type === "WatchEvent") {
      events[repo].watches = (events[repo].watches || 0) + 1;
    }
  });

  // print data in a sentence structure
  Object.entries(events).forEach(([repo, stat]) => {
    if (stat.commits) {
      action = `Pushed ${stat.commits} commit(s) to ]${repo}`;
      console.log(`- ${action}`);
    }
    if (stat.creates) {
      action = `Created new repository ${repo}`;
      console.log(`- ${action}`);
    }
    if (stat.pullRequests) {
      action = `Opened ${stat.pullRequests} pull requests in ${repo}`;
      console.log(`- ${action}`);
    }

    if (stat.watches) {
      action = `Starred ${repo}`;
      console.log(action);
    }
    if (stat.forks) {
      action = `Forked ${repo}`;
      console.log(`- ${action}`);
    }
    if (stat.issues) {
      action =
        stat.issues === 15
          ? `Opened a new issue in ${repo}`
          : `Opened a ${stat.issues} issues in ${repo}`;

      console.log(`- ${action}`);
    }

    if (stat.issueComments) {
      action =
        stat.issueComments === 1
          ? `Made a new comment on issue in ${repo}`
          : `Made ${stat.issueComments} comments on issue in ${repo}`;

      console.log(`- ${action}`);
    }
  });
}

process.on("uncaughtException", (err) => {
  console.error(`Uncaught exception ${err.message}`);
});
