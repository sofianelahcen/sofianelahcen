import { ColumnSet, ColumnUnit, Lines, Page } from "@/components/Layout";
import { ArchiveGallery } from "@/components/ArchiveGallery";
import { Slideshow } from "@/components/Slideshow";
import {
  archiveProjects,
  galleries,
  nav,
  profile,
  projects,
} from "@/lib/content";

function TopNav() {
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

function TopNavMobile() {
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

function MiddleNav() {
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

function BottomNav() {
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

function Profile() {
  return (
    <Page id="profile">
      <Lines count={29} />
      <ColumnSet columns="2fr 1fr 1fr" gutter="1rem">
        <ColumnUnit />
        <ColumnUnit>
          <span className="caption">
            {profile.name}
            <br />
            {profile.role}
            <br />
            <br />
            {profile.statement}
            <br />
            <br />
            <br />
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <br />
            <a href={profile.instagram} target="_blank" rel="noreferrer">
              instagram
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

function Archive() {
  return (
    <Page id="archive">
      <Lines count={1} />
      <ArchiveGallery projects={archiveProjects} />
      <Lines count={13} />
    </Page>
  );
}

export default function Home() {
  return (
    <div className="stack">
      <TopNav />
      <TopNavMobile />
      <MiddleNav />

      <main className="pages">
        <Page id="project-001">
          <Lines count={4} />
          {galleries.map((gallery, index) => (
            <div key={gallery.id}>
              <Slideshow slides={gallery.slides} priority={index === 0} />
              {gallery.trailingLines ? (
                <Lines count={gallery.trailingLines} />
              ) : null}
            </div>
          ))}
        </Page>

        {projects.map((project) => (
          <Page key={project.id} id={project.id}>
            {project.leadingLines ? <Lines count={project.leadingLines} /> : null}
            <Slideshow slides={project.slides} />
            {project.trailingLines ? (
              <Lines count={project.trailingLines} />
            ) : null}
          </Page>
        ))}

        <Profile />
        <Archive />
      </main>

      <BottomNav />
    </div>
  );
}
