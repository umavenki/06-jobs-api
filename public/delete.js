import { enableInput, message, token } from "./index.js";
import { showJobs } from "./jobs.js";

export const deleteJob = async (jobId) => {
  if (!jobId) {
    // might happen if the list has been updated since last display
    message.textContent = "Invalid job id";
    showJobs();
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        message.textContent = "Job successfully deleted";
        showJobs();
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The job delete failed";
        showJobs();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showJobs();
    }

    enableInput(true);
  }
};
