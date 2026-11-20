export default function EducationExperience() {
  return (
    <section
      id="education-experience"
      aria-labelledby="education-experience-title"
      className="scroll-mt-32 border-t border-black/5 p-8 md:scroll-mt-56 md:px-16 md:py-12"
    >
      <h3
        id="education-experience-title"
        lang="en"
        className="mb-7 font-heading text-2xl font-bold tracking-tight text-primary md:mb-9 md:text-3xl"
      >
        Education &amp; Experience
      </h3>

      <div className="grid gap-7 md:grid-cols-2 md:gap-12">
        <div>
          <h4 lang="en" className="mb-3 font-heading text-lg font-semibold text-primary">
            Education
          </h4>
          <ul className="border-t border-black/15 font-thai text-secondary">
            <li className="space-y-1 border-b border-black/10 py-4">
              <h5 className="text-lg font-semibold text-primary">มหาวิทยาลัยสงขลานครินทร์</h5>
              <p>คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์</p>
              <p className="text-sm">
                <time dateTime="2023-06">มิ.ย. 2023</time> – คาดว่าจะจบ <time dateTime="2027-03">มี.ค. 2027</time>
              </p>
              <p className="text-sm">เกรดเฉลี่ยสะสม <strong className="text-primary">3.93</strong></p>
            </li>
            <li className="space-y-1 py-4">
              <h5 className="text-lg font-semibold text-primary">โรงเรียนสุราษฎร์พิทยา</h5>
              <p>มัธยมศึกษาตอนปลาย แผนการเรียนวิทย์–คณิต</p>
              <p className="text-sm">จบปี <time dateTime="2023">2023</time> (พ.ศ. 2566)</p>
            </li>
          </ul>
        </div>

        <div>
          <h4 lang="en" className="mb-3 font-heading text-lg font-semibold text-primary">
            Experience
          </h4>
          <ul className="border-t border-black/15 font-thai text-secondary">
            <li className="space-y-1 border-b border-black/10 py-4">
              <h5 lang="en" className="font-heading text-lg font-semibold text-primary">Sony Device Technology</h5>
              <p><span lang="en">Fullstack Developer</span> · สหกิจศึกษา 4 เดือน</p>
              <p className="text-sm">
                เริ่ม <time dateTime="2026-11-16">16 พ.ย. 2026</time> · กำหนดสิ้นสุด <time dateTime="2027-03-19">19 มี.ค. 2027</time>
              </p>
            </li>
            <li className="space-y-1 py-4">
              <h5 lang="en" className="font-heading text-lg font-semibold text-primary">PUPA</h5>
              <p lang="en">Software Engineer</p>
              <p className="text-sm">ตั้งแต่ปี 1 เทอม 2 จนถึงก่อนเริ่มสหกิจศึกษา</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
