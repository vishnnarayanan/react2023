import { Alert, Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function ColorChooser() {
  const [color, setColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [allColors, setAllColors] = useState([]);
  // useEffect(() => {
  //   let x = (localStorage.getItem('colors') || '').split(',');
  //   setAllColors(x);
  // }, [color]);

  function getTextColor(e) {
    var c = e.substring(1); // strip #
    var rgb = parseInt(c, 16); // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff; // extract red
    var g = (rgb >> 8) & 0xff; // extract green
    var b = (rgb >> 0) & 0xff; // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    if (luma < 70) {
      // pick a different colour
      return '#ffffff';
    } else {
      return '#000000';
    }
  }

  function changeColor(e) {
    setColor(e);
    setTextColor(getTextColor(e));
  }

  function addColor() {
    let colorsInStorage = localStorage.getItem('colors') || '';
    colorsInStorage = colorsInStorage.concat(color + ',').split(',');
    let outputArray = colorsInStorage.filter(function (v, i, self) {
      // It returns the index of the first
      // instance of each value
      return i === self.indexOf(v);
    });
    setAllColors(outputArray);
    localStorage.setItem('colors', outputArray);
  }
  return (
    <>
      <div
        style={{
          backgroundColor: color || '#FFFFFF',
          padding: '20px',
          color: textColor,
        }}
      >
        <h1>Heading</h1>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          justifyContent: 'center',
        }}
      >
        <input
          style={{ border: '0px' }}
          type={'color'}
          value={color}
          onChange={(e) => {
            changeColor(e.target.value);
          }}
        />

        <input
          type={'text'}
          style={{
            height: '33px',
            fontSize: '18px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
          }}
          value={color.toUpperCase()}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
        <Button
          variant='contained'
          onClick={() => addColor()}
          endIcon={<AddCircleIcon />}
        >
          ADD
        </Button>
      </div>
      <br />
      <br />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px' }}>
        {allColors.map((e) => {
          return (
            <div
              onClick={(e) => {
                changeColor(e.target.innerHTML);
              }}
              style={{
                cursor: 'pointer',
                backgroundColor: e,
                height: '100px',
                minWidth: '200px',
                textAlign: 'center',
                color: getTextColor(e),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid white',
                borderRadius: '10px',
                boxShadow: '1px 1px 5px 0px black',
                position: 'relative',
              }}
            >
              {e}
              <IconButton
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: getTextColor(e),
                }}
                color='secondary'
                aria-label='delete color'
                onClick={() => {
                  console.log(allColors.filter((b) => b !== e));
                  localStorage.setItem('colors', allColors);
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ColorChooser;
