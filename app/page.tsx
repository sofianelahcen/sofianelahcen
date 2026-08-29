import { ColumnSet, ColumnUnit, Lines, Page } from "@/components/Layout";
import { ArchiveGallery } from "@/components/ArchiveGallery";
import { Slideshow } from "@/components/Slideshow";
import { StructuredData } from "@/components/StructuredData";
import { getSiteContent, type SiteContent } from "@/lib/site-data";

type Nav = SiteContent["nav"];
type Profile = SiteContent["profile"];

function TopNav({ nav }: { nav: Nav }) {
  return (
    <Page id="top-nav" pinned="top" zIndex={399}>
      <ColumnSet
        columns="var(--nav-columns)"
        gutter="2rem"
        stackOnMobile={false}
      >
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

function MiddleNav({ nav }: { nav: Nav }) {
  return (
    <Page id="middle-nav" pinned="top" zIndex={398} className="nav-desktop">
      <ColumnSet columns="1fr 1fr" gutter="2rem" stackOnMobile={false}>
        <ColumnUnit>
          <Lines count={5} />
          <h2 className="section-label">
            <a href="#project-001">{nav.section}</a>
          </h2>
        </ColumnUnit>
        <ColumnUnit />
      </ColumnSet>
    </Page>
  );
}

function BottomNav({ nav }: { nav: Nav }) {
  return (
    <Page id="bottom-nav" pinned="bottom" zIndex={391}>
      <nav aria-label="Sections">
        <ColumnSet columns="1fr 1fr" gutter="2rem" stackOnMobile={false}>
          <ColumnUnit>
            <p className="nav-link">
              <a href="#profile">{nav.contact}</a>
            </p>
          </ColumnUnit>
          <ColumnUnit>
            <p className="nav-link nav-link-end">
              <a href="#archive">{nav.archive}</a>
            </p>
          </ColumnUnit>
        </ColumnSet>
      </nav>
    </Page>
  );
}

function Profile({ profile }: { profile: Profile }) {
  return (
    <Page id="profile">
      <div className="profile-center">
        <span className="caption profile-text">
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
      </div>
    </Page>
  );
}

export default async function Home() {
  const { nav, profile, works, archive } = await getSiteContent();

  return (
    <div className="stack">
      <StructuredData profile={profile} archive={archive} />
      <TopNav nav={nav} />
      <MiddleNav nav={nav} />

      <main className="pages">
        {works.map((work, index) => (
          <Page key={work.id} id={work.id}>
            <Slideshow slides={work.slides} priority={index === 0} />
          </Page>
        ))}

        <Profile profile={profile} />

        <Page id="archive">
          <h2 className="archive-heading">{nav.archive}</h2>
          <ArchiveGallery projects={archive} />
          <Lines count={13} />
        </Page>
      </main>

      <BottomNav nav={nav} />
    </div>
  );
}
