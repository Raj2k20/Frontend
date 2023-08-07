import React, { useState } from 'react';
import { Dropdown } from '@nextui-org/react';
import axios from 'axios';
import TagsInput from 'react-tagsinput';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import "./FeaturesBlocks.css"
// import axios from "axios"
function FeaturesBlocks(props) {
  // const batsmanOptions = ['Virat Kohli', 'Rohit Sharma', 'Suryakumar Yadav'];
  // const bowlerOptions = ['Jasprit Bumrah', 'Mohammed Shami', 'Yuzvendra Chahal'];
  // const wicketOptions = ['Caught', 'Bowled', 'Run Out'];
  // const shotOptions = ['Straight Drive', 'Cover Drive', 'Pull Shot'];
  // const runsOptions = ['0', '1', '2', '3', '4', '6'];
  const additionalTagsOptions = [
    "four", "six", "offside", "legside", "bowled", "caught", "runout", "lbw", "stumped", "spinball", "fastball",    
    'Drive',
    'Cut',
    'Pull',
    'Hook',
    'Sweep',
    'Cover Drive',
    'Straight Drive',
    'Square Cut',
    'Late Cut',
    'Flick',
    'On Drive',
    'Reverse Sweep',
    'Helicopter Shot',
    'Switch Hit',
    'Ramp Shot',
    'Dil-scoop',
    'Paddle Sweep',
    'Slog Sweep',
    'Leg Glance',
    'Upper Cut',
  ];

  const [selectedStriker, setSelectedStriker] = useState([]);
  const [selectedNonStriker, setSelectedNonStriker] = useState([]);
  const [selectedBowler, setSelectedBowler] = useState([]);
  const [selectedRuns, setSelectedRuns] = useState([]);
  const [selectedWicket, setSelectedWicket] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleStrikerSelection = (e) => {
    const inputValue = e.target.value;
    const selectedValues = inputValue !== '' ? inputValue.split(",").map(value => value.trim()) : [];
    setSelectedStriker(selectedValues);
  };
  
  const handleNonStrikerSelection = (e) => {
    const inputValue = e.target.value;
    const selectedValues = inputValue !== '' ? inputValue.split(",").map(value => value.trim()) : [];
    setSelectedNonStriker(selectedValues);
  };
  
  const handleBowlerSelection = (e) => {
    const inputValue = e.target.value;
    const selectedValues = inputValue !== '' ? inputValue.split(",").map(value => value.trim()) : [];
    setSelectedBowler(selectedValues);
  };
  
  const handleRunsSelection = (e) => {
    const inputValue = e.target.value;
    const selectedValues = inputValue !== '' ? inputValue.split(",").map(value => value.trim()) : [];
    setSelectedRuns(selectedValues);
  };
  
  const handleWicketSelection = (e) => {
    const inputValue = e.target.value;
    const selectedValues = inputValue !== '' ? inputValue.split(",").map(value => value.trim()) : [];
    setSelectedWicket(selectedValues);
  };
  

  const handleTagsSelection = (e,newValue) => {
    setSelectedTags(newValue);
    // console.log(e.target.value);
  };


    const handleSubmit = () => {
      const selectedTagsDict = selectedTags.reduce((acc, tag) => {
        acc[tag] = true;
        return acc;
      }, {});
    let data = JSON.stringify({
      "bowler": selectedBowler,
      "striker": selectedStriker,
      "nonstriker": selectedNonStriker,
      "runs": selectedRuns,
      "out": selectedWicket,
      "tags":  selectedTagsDict,
      "name": "test1_mp4"
    });

    console.log(data);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://9f13-14-139-82-6.ngrok-free.app/searchv3',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
    

    // console.log(data)


    axios.request(config)
    .then((response) => {
      console.log(response.data);
      props.setVideoList(response.data.ball_link)
      console.log(response.data.ball_link)
    })
    .catch((error) => {
      console.log(error);
    });

  };

  // const [selectedTags, setSelectedTags] = useState([]);
  // const handleTagSelection = (event, newValue) => {
  //   setSelectedTags(newValue);
  // };

  const whiteInputStyle = {
    color: 'black',
    backgroundColor: 'white', // Set the background color to white
    border: '1px solid #ccc',
    borderRadius: '0px',
    width: '200px', // Set the width of the input box
    // height: '60px', // Set the height of the input box
    // padding: '6px', // Optional: Add padding for better appearance
    // overflow: 'hidden', // Show only the last typed text when it exceeds the width
    // textOverflow: 'ellipsis', // Add ellipsis (...) for text that overflows
    // whiteSpace: 'nowrap', // Prevent text from wrapping onto next line
  };
  const whiteAutocompleteInputStyle = `
    .whiteInput .MuiAutocomplete-inputRoot[class*="MuiInput-root"] {
      background-color: white; /* Set the background color to white */
    }
  `;
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            {/* <h2 className="h2 mb-4">Keywords Selection</h2> */}
            <h2 className="h2 mb-4">Sports Analytics</h2>
            <p className="text-xl text-gray-400">Submit a query using the keywords from the following dropdowns</p>
          </div>
          <style>{whiteAutocompleteInputStyle}</style>
          <div
            className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none"
            data-aos-id-blocks
          >
            {/* Striker */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
              <h4 className="h4 mb-2">Striker</h4>
              <TextField
                type="text"
                className="search-bar w-full mb-4 sm:w-auto sm:mb-0"
                placeholder="Enter Striker"
                onChange={handleStrikerSelection}
                inputProps={{ style: whiteInputStyle }} // Apply the whiteInputStyle to this input
              />
            </div>
            {/* Non Striker */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
              <h4 className="h4 mb-2">Non Striker</h4>
              <TextField
                type="text"
                className="search-bar w-full mb-4 sm:w-auto sm:mb-0"
                placeholder="Enter Non Striker"
                onChange={handleNonStrikerSelection}
                inputProps={{ style: whiteInputStyle }} // Apply the whiteInputStyle to this input
              />
            </div>
            {/* Bowler */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
              <h4 className="h4 mb-2">Bowler</h4>
              <TextField
                type="text"
                className="search-bar w-full mb-4 sm:w-auto sm:mb-0"
                placeholder="Enter Bowler"
                onChange={handleBowlerSelection}
                inputProps={{ style: whiteInputStyle }} // Apply the whiteInputStyle to this input
              />
            </div>
            {/* 5th item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="400" data-aos-anchor="[data-aos-id-blocks]">
              <h4 className="h4 mb-2">Runs Scored</h4>
              <TextField
                type="text"
                className="search-bar w-full mb-4 sm:w-auto sm:mb-0"
                placeholder="Enter Runs Scored"
                onChange={handleRunsSelection}
                inputProps={{ style: whiteInputStyle }} // Apply the whiteInputStyle to this input
              />
            </div>
            {/* 6th item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="500" data-aos-anchor="[data-aos-id-blocks]">
              <h4 className="h4 mb-2">Type of Wicket</h4>
              <TextField
                type="text"
                className="search-bar w-full mb-4 sm:w-auto sm:mb-0"
                placeholder="Enter Wickets"
                onChange={handleWicketSelection}
                inputProps={{ style: whiteInputStyle }} // Apply the whiteInputStyle to this input
              />
            </div>
            {/* 7th item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="600" data-aos-anchor="[data-aos-id-blocks]">
              <h4 className="h4 mb-2">Additional Tags</h4>
              <Autocomplete
                multiple
                id="tags"
                options={additionalTagsOptions}
                onChange={handleTagsSelection}
                value={selectedTags}
                // className="whiteInput"
                // inputProps={{ style: whiteInputStyle }}
                renderInput={(params) => 
                  <TextField {...params} placeholder="Additional Tags" style={whiteInputStyle} />
                }
              />
            </div>
          </div>
          <div style={{ height: '75px' }}></div>
          <div className="flex justify-center mt-8">
            <button
              className="btn text-white w-full sm:w-auto sm:ml-4"
              onClick={handleSubmit}
              type="submit"
              style={{ backgroundColor: '#0072f5', height: '40px' }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesBlocks;










