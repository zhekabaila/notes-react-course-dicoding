import React from 'react'
import Container from './components/layout/container'
import Card from './components/card'
import { getInitialData } from './utils'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: getInitialData(),
      title: '',
      body: '',
      archived: false,
    }

    this.onDeleteHandler = this.onDeleteHandler.bind(this)
    this.changeNoteStatus = this.changeNoteStatus.bind(this)
    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this)
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this)
    this.onArchivedChangeHandler = this.onArchivedChangeHandler.bind(this)
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this)
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((notes) => notes.id !== id)
    this.setState({ notes })
  }

  changeNoteStatus(id) {
    const notes = this.state.notes.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    )
    this.setState({ notes })
  }

  onTitleChangeHandler(event) {
    if (
      this.state.title.length < 50 ||
      event.nativeEvent.inputType === 'deleteContentBackward'
    ) {
      this.setState(() => {
        return {
          title: event.target.value,
        }
      })
    }
  }

  onBodyChangeHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      }
    })
  }

  onArchivedChangeHandler(event) {
    this.setState(() => {
      return {
        archived: event.target.checked,
      }
    })
  }

  onSubmitEventHandler(event) {
    event.preventDefault()

    const newNote = {
      id: +new Date(),
      title: this.state.title,
      body: this.state.body,
      archived: this.state.archived,
      createdAt: new Date().toISOString(),
    }

    this.setState(() => {
      return {
        notes: [...this.state.notes, newNote],
        title: '',
        body: '',
        archived: false,
      }
    })
  }

  render() {
    const archivedNotes = this.state.notes.filter((notes) => notes.archived)
    const activeNotes = this.state.notes.filter((notes) => !notes.archived)

    return (
      <>
        <Container>
          <section className="space-y-7 px-4 max-w-xl mx-auto mt-12">
            <h2 className="text-2xl font-medium">Buat Catatan</h2>
            <form
              action=""
              className="space-y-3"
              onSubmit={this.onSubmitEventHandler}
            >
              <div>
                <p className="text-end">
                  sisa karakter: {50 - this.state.title.length}
                </p>
                <input
                  type="text"
                  className="p-3 bg-primary border border-snow rounded-sm w-full outline-none"
                  placeholder="ini adalah judul..."
                  value={this.state.title}
                  onChange={this.onTitleChangeHandler}
                />
              </div>
              <textarea
                name="catatan"
                id="catatan"
                rows="7"
                placeholder="Tuliskan catatanmu di sini..."
                value={this.state.body}
                onChange={this.onBodyChangeHandler}
                className="bg-primary p-3 border border-snow rounded-sm w-full outline-none"
              ></textarea>
              <div className="flex items-center gap-x-3">
                <input
                  type="checkbox"
                  id="archived"
                  onChange={this.onArchivedChangeHandler}
                />
                <label className="texx-base font-medium" htmlFor="archived">
                  Arsipkan Note
                </label>
              </div>
              <button
                type="submit"
                className="bg-primary p-2 border border-snow rounded-sm w-full"
              >
                Buat
              </button>
            </form>
          </section>
          <section className="max-w-6xl px-4 mx-auto mt-12 py-12">
            <h2 className="text-2xl font-medium mb-5">Catatan Aktif</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeNotes.length > 0 ? (
                activeNotes.map((item) => (
                  <Card
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    body={item.body}
                    createdAt={item.createdAt}
                    archived={item.archived}
                    onDelete={this.onDeleteHandler}
                    onChangeNoteStatus={this.changeNoteStatus}
                  />
                ))
              ) : (
                <p className="text-lg text-danger font-semibold">
                  Tidak ada catatan
                </p>
              )}
            </div>
          </section>
          <section className="max-w-6xl px-4 mx-auto mt-12 py-12">
            <h2 className="text-2xl font-medium mb-5">Catatan Arsip</h2>
            <div className="grid grid-cols-4 gap-4">
              {archivedNotes.length > 0 ? (
                archivedNotes.map((item) => (
                  <Card
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    body={item.body}
                    archived={item.archived}
                    createdAt={item.createdAt}
                    onDelete={this.onDeleteHandler}
                    onChangeNoteStatus={this.changeNoteStatus}
                  />
                ))
              ) : (
                <p className="text-lg text-danger font-semibold">
                  Tidak ada catatan
                </p>
              )}
            </div>
          </section>
        </Container>
      </>
    )
  }
}

export default Home
