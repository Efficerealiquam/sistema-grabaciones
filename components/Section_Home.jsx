import "@styles/Section_home.css";

const Section_Home = () => {
  return (
    <div className='section_content relative flex flex-col w-full ' >
      <section className="w-full relative wrap-table b-blank container_table">
        <div className="table-first-column" >
          <table className="tbl-1" >
            <thead>
              <tr>
                <th>Employees</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="column1" >Brandon Green</td>
              </tr>
              <tr>
                <td className="column1">Kathy Daniels</td>
              </tr>
              <tr>
                <td className="column1">Elizabeth Alvarado</td>
              </tr>
              <tr>
                <td className="column1">Michael Coleman</td>
              </tr>
              <tr>
                <td className="column1">Jason Cox</td>
              </tr>
              <tr>
                <td className="column1">Christian Perkins</td>
              </tr>
              <tr>
                <td className="column1">Emily Wheeler</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section>
        Section 2
      </section>
    </div>
  )
}

export default Section_Home