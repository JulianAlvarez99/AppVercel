
import React from 'react';
import SITE from '../config/siteConfig';

export default function BankInfo({visible}){
  if (!visible) return null;
  const b = SITE.bank;
  return (
    <div style={{padding:12, background:'#fff', borderRadius:8, maxWidth:520, margin:'12px auto'}}>
      <div><strong>Titular:</strong> {b.holder}</div>
      <div><strong>CBU:</strong> {b.cbu}</div>
      <div><strong>Alias:</strong> {b.alias}</div>
    </div>
  );
}
