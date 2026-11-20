import Image from "next/image";

const entry = "group relative flex items-start gap-3";
const stem = "after:absolute after:top-6 after:left-6 after:w-px after:bg-accent-200";
const branch = "pb-4 pl-6 last:pb-0 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-px before:bg-accent-200 last:before:bottom-auto last:before:h-6 after:absolute after:top-6 after:left-0 after:h-px after:w-6 after:bg-accent-200";
const logo = "relative z-10 size-12 shrink-0 rounded-lg border border-black/10 object-contain motion-safe:transition-colors group-hover:border-accent/40";
const details = "grid min-w-0 flex-1 gap-1 @xl:grid-cols-[minmax(0,1fr)_12rem] @xl:gap-x-6";
const name = "text-base font-semibold leading-snug text-primary";
const dates = "text-xs leading-relaxed tabular-nums text-secondary @xl:text-right";

export default function EducationExperience() {
  return (
    <div id="education-experience" className="@container mt-8 scroll-mt-56 border-t border-black/5 pt-6">
      <h3 lang="en" className="mb-5 font-mono text-xs uppercase tracking-widest text-secondary">
        Education &amp; Experience
      </h3>
      <ol role="list" className="font-thai text-sm leading-relaxed text-secondary">
        <li className={`${entry} ${stem} pb-5 after:-bottom-6`}>
          <Image src="/image/affiliations/suratpittaya.webp" alt="" width={144} height={128} sizes="48px" className={`${logo} bg-white p-1`} />
          <div className={details}>
            <div className="space-y-0.5">
              <p className={name}>โรงเรียนสุราษฎร์พิทยา</p>
              <p>มัธยมศึกษาตอนปลาย แผนการเรียนวิทย์–คณิต</p>
            </div>
            <p className={dates}>จบปี <time dateTime="2023">2023</time> (พ.ศ. 2566)</p>
          </div>
        </li>

        <li>
          <div className={`${entry} ${stem} pb-4 after:bottom-0`}>
            <Image src="/image/affiliations/psu.webp" alt="" width={144} height={55} sizes="48px" className={`${logo} bg-white p-1`} />
            <div className={details}>
              <div className="space-y-0.5">
                <p className={name}>มหาวิทยาลัยสงขลานครินทร์</p>
                <p>คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์</p>
                <p>เกรดเฉลี่ยสะสม <strong className="font-semibold tabular-nums text-primary">3.93</strong></p>
              </div>
              <p className={dates}>
                <time dateTime="2023-06">มิ.ย. 2023</time> – คาดว่าจะจบ <time dateTime="2027-03">มี.ค. 2027</time>
              </p>
            </div>
          </div>

          <ol role="list" aria-label="ประสบการณ์ระหว่างเรียนที่ ม.อ." className="ml-6">
            <li className={`${entry} ${branch}`}>
              <Image src="/image/affiliations/pupa.webp" alt="" width={140} height={140} sizes="48px" className={`${logo} bg-black`} />
              <div className={details}>
                <div className="space-y-0.5">
                  <p lang="en" className={`${name} font-heading`}>PUPA</p>
                  <p lang="en">Software Engineer</p>
                </div>
                <p className={dates}>ปี 1 เทอม 2 จนถึงก่อนเริ่มสหกิจศึกษา</p>
              </div>
            </li>

            <li className={`${entry} ${branch}`}>
              <Image src="/image/affiliations/bonmek.webp" alt="" width={144} height={144} sizes="48px" className={`${logo} bg-white p-1`} />
              <div className={details}>
                <div className="space-y-0.5">
                  <p lang="en" className={`${name} font-heading`}>Bonmek</p>
                  <p>ฝึกงานระยะสั้น</p>
                </div>
                <p className={dates}>
                  กลาง <time dateTime="2025-04">เม.ย.</time> – กลาง <time dateTime="2025-05">พ.ค. 2025</time>
                </p>
              </div>
            </li>

            <li className={`${entry} ${branch}`}>
              <Image src="/image/affiliations/sony.webp" alt="" width={144} height={25} sizes="48px" className={`${logo} bg-black p-1`} />
              <div className={details}>
                <div className="space-y-0.5">
                  <p lang="en" className={`${name} font-heading`}>Sony Device Technology</p>
                  <p><span lang="en">Fullstack Developer</span> · สหกิจศึกษา 4 เดือน</p>
                </div>
                <p className={dates}>
                  <time dateTime="2026-11-16">16 พ.ย. 2026</time> – <time dateTime="2027-03-19">19 มี.ค. 2027</time> (กำหนดสิ้นสุด)
                </p>
              </div>
            </li>
          </ol>
        </li>
      </ol>
    </div>
  );
}
