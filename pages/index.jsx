import { useState } from 'react';
import Report from '../components/Report';

export default function Home(){
  const [form, setForm] = useState({ name:'', dob:'', phone:'', notes:'' });
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  async function submit(e){
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/numerology',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
    const json = await res.json();
    setLoading(false);
    if(json.ok) setReport(json.report);
    else alert(json.error || 'Error');
  }

  return (
    <div style={{minHeight:'100vh',padding:24,background:'#f7fafc',fontFamily:'Inter, system-ui, -apple-system, Segoe UI, Roboto'}}>
      <div style={{maxWidth:900,margin:'0 auto',background:'white',borderRadius:12,boxShadow:'0 4px 24px rgba(0,0,0,0.06)',padding:24}}>
        <h1 style={{fontSize:24,fontWeight:700,marginBottom:12}}>Numerology — Professional Report</h1>
        <form onSubmit={submit} style={{display:'grid',gap:12}}>
          <div>
            <label style={{display:'block',fontSize:13,fontWeight:600}}>Full Name</label>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{marginTop:8,padding:10,width:'100%',borderRadius:8,border:'1px solid #e5e7eb'}} placeholder="e.g. Rajesh Kumar" />
          </div>
          <div>
            <label style={{display:'block',fontSize:13,fontWeight:600}}>Date of Birth (optional)</label>
            <input value={form.dob} onChange={e=>setForm({...form,dob:e.target.value})} type="date" style={{marginTop:8,padding:10,width:'100%',borderRadius:8,border:'1px solid #e5e7eb'}} />
          </div>
          <div>
            <label style={{display:'block',fontSize:13,fontWeight:600}}>Phone (optional)</label>
            <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={{marginTop:8,padding:10,width:'100%',borderRadius:8,border:'1px solid #e5e7eb'}} placeholder="+91 98xxxx" />
          </div>
          <div>
            <label style={{display:'block',fontSize:13,fontWeight:600}}>Notes (optional)</label>
            <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} style={{marginTop:8,padding:10,width:'100%',borderRadius:8,border:'1px solid #e5e7eb'}} rows={3}></textarea>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button type="submit" style={{padding:'10px 16px',background:'#4f46e5',color:'white',borderRadius:8,border:'none'}}>{loading ? 'Calculating...' : 'Calculate Report'}</button>
            <button type="button" onClick={()=>{ setForm({name:'',dob:'',phone:'',notes:''}); setReport(null); }} style={{padding:'10px 16px',borderRadius:8,border:'1px solid #e5e7eb'}}>Reset</button>
          </div>
        </form>

        {report && <div style={{marginTop:20}}>
          <Report data={report} />
        </div>}
      </div>
    </div>
  )
}
