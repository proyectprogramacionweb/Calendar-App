import { Calendar,  } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours} from 'date-fns'

import { localizer, getMessagesES } from '../../helpers'
import CalendarEvent from '../components/CalendarEvent'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import CalendarModal from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import useCalendarStore from '../../hooks/useCalendarStore'


const CalendarPage = () => {

  const {openDateModal} = useUiStore()
  const {events} = useCalendarStore()

  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week' )

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return{
      style
    }
  }

  const onDoubleClick = (event) => {
    // console.log({onDoubleClick: event})
    openDateModal();
  }

  const onSelect = (event) => {
    console.log({click: event})
  }
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
    setlastView(event)
  }

  return (
    <>
      <Navbar/>

      <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px )' }}
      messages={getMessagesES()}
      eventPropGetter={eventStyleGetter}
      components={{
        event: CalendarEvent
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
    />

      <CalendarModal/>

    </>
  )
}

export default CalendarPage
