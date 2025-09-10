export default function Report({ data }){
  if(!data) return null;
  return (
    <div style={{borderRadius:10,padding:16,background:'#f8fafc',border:'1px solid #eef2ff'}}>
      <h2 style={{fontSize:18,fontWeight:700}}>Numerology Report</h2>
      <p style={{fontSize:12,color:'#6b7280'}}>Generated: {new Date(data.generatedAt).toLocaleString()}</p>

      <section style={{marginTop:12}}>
        <h3 style={{fontWeight:600}}>Inputs</h3>
        <ul>
          <li><strong>Name:</strong> {data.input.name}</li>
          <li><strong>DOB:</strong> {data.input.dob || '—'}</li>
          <li><strong>Phone:</strong> {data.input.phone || '—'}</li>
        </ul>
      </section>

      <section style={{marginTop:12}}>
        <h3 style={{fontWeight:600}}>Core Numbers</h3>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          <div style={{padding:8,background:'white',borderRadius:8}}>
            <strong>Pythagorean (Destiny):</strong>
            <div>{data.pythagorean.total} → {data.pythagorean.reduced}</div>
          </div>
          <div style={{padding:8,background:'white',borderRadius:8}}>
            <strong>Chaldean:</strong>
            <div>{data.chaldean.total} → {data.chaldean.reduced}</div>
          </div>
          <div style={{padding:8,background:'white',borderRadius:8}}>
            <strong>Soul Number:</strong>
            <div>{data.soul.total || 0} → {data.soul.reduced || 0}</div>
          </div>
          <div style={{padding:8,background:'white',borderRadius:8}}>
            <strong>Personality:</strong>
            <div>{data.personality.total || 0} → {data.personality.reduced || 0}</div>
          </div>
        </div>
      </section>

      <section style={{marginTop:12}}>
        <h3 style={{fontWeight:600}}>Interpretation</h3>
        <pre style={{whiteSpace:'pre-wrap',background:'white',padding:12,borderRadius:8}}>{data.interpretation}</pre>
      </section>
    </div>
  );
}
