import { ColumnSet, ColumnUnit, Lines, Page } from "@/components/Layout";
import { ArchiveGallery } from "@/components/ArchiveGallery";
import { Slideshow } from "@/components/Slideshow";
import { getSiteContent, type SiteContent } from "@/lib/site-data";

type Nav = SiteContent["nav"];
type Profile = SiteContent["profile"];

function TopNav({ nav }: { nav: Nav }) {
  return (
    <Page id="top-nav" pinned="top" zIndex={399} className="nav-desktop">
      <ColumnSet columns="1fr 1fr" gutter="2rem" stackOnMobile={false}>
        <ColumnUnit>
          <h1>
            <a href="#project-001">
              {nav.title}
              <br />
              {nav.tagline}
            </a>
          </h1>
        </ColumnUnit>
        <ColumnUnit />
      </ColumnSet>
    </Page>
  );
}

function TopNavMobile({ nav }: { nav: Nav }) {
  return (
    <Page id="top-nav-mobile" pinned="top" zIndex={390} className="nav-mobile">
      <ColumnSet columns="9fr 3fr" gutter="2rem" stackOnMobile={false}>
        <ColumnUnit>
          <h1>
            <a href="#project-001">{nav.title}</a>
            <br />
            {nav.tagline}
          </h1>
        </ColumnUnit>
        <ColumnUnit />
      </ColumnSet>
    </Page>
  );
}

function MiddleNav({ nav }: { nav: Nav }) {
  return (
    <Page id="middle-nav" pinned="top" zIndex={398} className="nav-desktop">
      <ColumnSet columns="1fr 1fr" gutter="2rem" stackOnMobile={false}>
        <ColumnUnit>
          <Lines count={5} />
          <h1 style={{ lineHeight: 1.7 }}>{nav.section}</h1>
        </ColumnUnit>
        <ColumnUnit />
      </ColumnSet>
    </Page>
  );
}

function BottomNav({ nav }: { nav: Nav }) {
  return (
    <Page id="bottom-nav" pinned="bottom" zIndex={391}>
      <ColumnSet columns="1fr 1fr" gutter="2rem" stackOnMobile={false}>
        <ColumnUnit>
          <h1>
            <a href="#profile">{nav.contact}</a>
          </h1>
        </ColumnUnit>
        <ColumnUnit>
          <div style={{ textAlign: "right" }}>
            <h1>
              <a href="#archive">{nav.archive}</a>
            </h1>
          </div>
        </ColumnUnit>
      </ColumnSet>
    </Page>
  );
}

function Profile({ profile }: { profile: Profile }) {
  return (
    <Page id="profile">
      <Lines count={29} />
      <ColumnSet columns="2fr 1fr 1fr" gutter="1rem">
        <ColumnUnit />
        <ColumnUnit>
          <span className="caption">
            {profile.statement}
            <br />
            <br />
            <br />
            <a href={`mailto:${profile.email}`}>CONTACT</a>
            <br />
            <a href={profile.instagram} target="_blank" rel="noreferrer">
              INSTAGRAM
            </a>
          </span>
          <Lines count={3} />
        </ColumnUnit>
        <ColumnUnit />
      </ColumnSet>
      <Lines count={6} />
    </Page>
  );
}

export default async function Home() {
  const { nav, profile, works, archive } = await getSiteContent();

  return (
    <div className="stack">
      <TopNav nav={nav} />
      <TopNavMobile nav={nav} />
      <MiddleNav nav={nav} />

      <main className="pages">
        {works.map((work, index) => (
          <Page key={work.id} id={work.id}>
            <Slideshow slides={work.slides} priority={index === 0} />
          </Page>
        ))}

        <Profile profile={profile} />

        <Page id="archive">
          <Lines count={1} />
          <ArchiveGallery projects={archive} />
          <Lines count={13} />
        </Page>
      </main>

      <BottomNav nav={nav} />
    </div>
  );
}
