import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './s.module.css';
import { createStyles, makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) =>
  createStyles({
    styleLeft: {
      display: 'flex',
      alignItems: 'center',
      left: 0,
      bottom: 0,
    },
    styleRight: {
      fontSize: '15px',
      lineHeight: '16px',
      fontWeight: 600,
      textDecoration: 'none',
      right: 0,
      bottom: 0,
    }
  })
);


export function Footer() {
  const classes = useStyles();

  const [color, setColor] = useState('#B2B2B2');

  return (
    <footer className={s.footer}>
      <nav className={classes.styleLeft} >
        <span className={s.item} >
          Contact: <span className={s.contact}>team@crosschainlabs.tech</span>
        </span>
      </nav>
      <span
        className={classes.styleRight}
        onMouseEnter={() => {
          setColor('#212B36')
        }}
        onMouseLeave={() => {
          setColor('#B2B2B2')
        }}
        style={{
          color: color
        }}
      >
        Powered by CrossChain Labs
      </span>
    </footer>
  );
}
