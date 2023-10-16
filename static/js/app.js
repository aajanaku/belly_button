// Bar chart function
function createBarChart(sample) {
    // Select the top 10 OTUs
    const top10SampleValues = sample.sample_values.slice(0, 10).reverse();
    const top10OtuIds = sample.otu_ids.slice(0, 10).reverse().map(otuId => `OTU ${otuId}`);
    const top10OtuLabels = sample.otu_labels.slice(0, 10).reverse();
  
    // Bar chart function
    const trace = {
      x: top10SampleValues,
      y: top10OtuIds,
      text: top10OtuLabels,
      type: "bar",
      orientation: "h"
    };
  
    const data = [trace];
  
    const layout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" }
    };
  
    Plotly.newPlot("bar", data, layout);
  }
  
  // Bubble chart function
  function createBubbleChart(sample) {
    const trace = {
      x: sample.otu_ids,
      y: sample.sample_values,
      text: sample.otu_labels,
      mode: "markers",
      marker: {
        size: sample.sample_values,
        color: sample.otu_ids,
        colorscale: "Viridis",
        colorbar: { title: "OTU ID" }
      }
    };
  
    const data = [trace];
  
    const layout = {
      title: "Bubble Chart",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" }
    };
  
    Plotly.newPlot("bubble", data, layout);
  }
  
  // Sample metadata function
  function displayMetadata(metadataItem) {
    const metadataDiv = d3.select("#sample-metadata");
    metadataDiv.html(""); // Clear previous metadata
  
    // Iterate through metadata and display key-value pairs
    Object.entries(metadataItem).forEach(([key, value]) => {
      metadataDiv.append("p").text(`${key}: ${value}`);
    });
  }
  
  // Dropdown change function
  function optionChanged(selectedSample) {
    // Use D3 to load data from the samples.json file
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      // Find the selected sample in the data
      const selectedSampleData = data.samples.find(sample => sample.id === selectedSample);
  
      // Update plots
      createBarChart(selectedSampleData);
      createBubbleChart(selectedSampleData);
  
      // Find the selected metadata
      const selectedMetadata = data.metadata.find(metadataItem => metadataItem.id === parseInt(selectedSample));
  
      // Display sample metadata
      displayMetadata(selectedMetadata);
    });
  }
  
  // Initialize the dropdown with options
  function init() {
    const dropdown = d3.select("#selDataset");
    // Use D3 to load data from the samples.json file for the dropdown options
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      data.names.forEach(sample => {
        dropdown.append("option").attr("value", sample).text(sample);
      });
  
      // Set the default sample for initial display
      const initialSample = data.names[0];
      optionChanged(initialSample);
    });
  }
  
  // Initialize the dropdown and plots
  init();
  