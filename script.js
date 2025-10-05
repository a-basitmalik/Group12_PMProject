// ⚙️ Project Standards Explorer - JavaScript Logic

const apiKey = "YOUR_API_KEY_HERE"; // Replace with your real key

// --- Search Standard ---
document.getElementById("searchBtn").addEventListener("click", async () => {
    const query = document.getElementById("standardInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!query) {
        resultDiv.innerHTML = "<p>Please enter a standard name.</p>";
        return;
    }

    resultDiv.innerHTML = "<p>Loading...</p>";

    const response = await fetch(`https://api.mistral.ai/v1/models`, {
        headers: { "Authorization": `Bearer ${apiKey}` }
    });

    const data = await response.json();

    // Demo output for now
    resultDiv.innerHTML = `
        <h3>Standard: ${query}</h3>
        <p>Sample summary: ${data.data ? "Fetched model list successfully." : "No data found."}</p>
    `;
});

// --- Compare Standards ---
document.getElementById("compareBtn").addEventListener("click", () => {
    const s1 = document.getElementById("standard1").value.trim();
    const s2 = document.getElementById("standard2").value.trim();
    const out = document.getElementById("comparisonResult");

    if (!s1 || !s2) {
        out.innerHTML = "<p>Please enter both standards.</p>";
        return;
    }

    out.innerHTML = `<p>Comparison between <b>${s1}</b> and <b>${s2}</b> will appear here.</p>`;
});

// --- Generate Project Process ---
document.getElementById("generateBtn").addEventListener("click", () => {
    const type = document.getElementById("projectType").value.trim();
    const out = document.getElementById("processResult");

    if (!type) {
        out.innerHTML = "<p>Please enter a project type.</p>";
        return;
    }

    out.innerHTML = `
        <h4>Generated ${type} process:</h4>
        <ul>
            <li>1. Define scope</li>
            <li>2. Identify standards</li>
            <li>3. Apply best practices</li>
            <li>4. Review and iterate</li>
        </ul>
    `;
});

// --- Book Search ---
document.getElementById("bookBtn").addEventListener("click", async () => {
    const book = document.getElementById("bookName").value.trim();
    const out = document.getElementById("bookResult");

    if (!book) {
        out.innerHTML = "<p>Please enter a book name.</p>";
        return;
    }

    out.innerHTML = "<p>Searching for books...</p>";

    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}`);
        const data = await res.json();

        if (!data.items) {
            out.innerHTML = "<p>No results found.</p>";
            return;
        }

        const bookInfo = data.items[0].volumeInfo;
        out.innerHTML = `
            <h4>${bookInfo.title}</h4>
            <p><b>Authors:</b> ${bookInfo.authors ? bookInfo.authors.join(", ") : "N/A"}</p>
            <p>${bookInfo.description ? bookInfo.description.slice(0, 150) + "..." : "No description available."}</p>
        `;
    } catch (error) {
        out.innerHTML = `<p>Error fetching book info: ${error.message}</p>`;
    }
});
