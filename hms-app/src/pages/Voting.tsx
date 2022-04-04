import React, { useState } from 'react'
import { Button, Title, useMantineTheme, Text, Grid } from '@mantine/core'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import ideaData from '../test/TestIdeaData'
import IdeaCardVotingPage from '../components/IdeaCardVotingPage'

const columnsFromBackend = {
  ['1']: {
    name: 'All ideas',
    items: [...ideaData],
  },
  ['2']: {
    name: 'Your Votes',
    items: [],
  },
}

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return
  const { source, destination } = result

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    })
  } else {
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    })
  }
}

export default function Voting() {
  const [columns, setColumns] = useState(columnsFromBackend)
  const theme = useMantineTheme()

  const backgroundColor =
    theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.dark[1]

  function submitVote() {
    console.log('voting submit is: ')
    console.log(columns['2'].items)
  }

  return (
    <div>
      <Grid>
        <Grid.Col span={12}>
          <Title pl={'sm'}>and the winner is...</Title>
        </Grid.Col>
        <Grid.Col span={12}>
          <Text size="lg" weight={600} pl={'sm'}>
            Welcome! here you will be able to vote for your favorite ideas
          </Text>
        </Grid.Col>
        <Grid.Col span={11}>
          <Text size="md" pl={'sm'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </Text>
        </Grid.Col>
        <Grid.Col span={12}>
          <Button color={'green'} size={'lg'} ml={'sm'} onClick={submitVote}>
            Submit vote
          </Button>
        </Grid.Col>

        <Grid.Col span={12}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
              <Grid.Col span={4}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div>
                    <Title order={2} align={'center'}>
                      {columns['1'].name}
                    </Title>
                    <Droppable droppableId={'1'} key={'1'}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? 'grey'
                              : backgroundColor,
                            minHeight: 500,
                            maxHeight: 750,
                            borderRadius: 15,
                            overflowY: 'scroll',
                            scrollbarWidth: 'none',
                            border: '10px solid',
                            borderColor: backgroundColor,
                          }}
                        >
                          {columns['1'].items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      marginBottom: '10px',
                                      marginTop: '5px',
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <IdeaCardVotingPage
                                      idea={item}
                                      index={index}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              </Grid.Col>

              <Grid.Col span={2}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyItems: 'space-between',
                  }}
                >
                  <Text>1.</Text>
                  <Text>2.</Text>
                  <Text>3.</Text>
                </div>
              </Grid.Col>

              <Grid.Col span={4}>
                <div>
                  <Title order={2} align={'center'}>
                    {columns['2'].name}
                  </Title>
                  <Droppable droppableId={'2'} key={'2'}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? 'grey'
                            : backgroundColor,
                          minHeight: 500,
                          maxHeight: 750,
                          borderRadius: 15,
                          overflowY: 'scroll',
                          scrollbarWidth: 'none',
                          margin: '10px',
                          //ToDO ask which border version is better

                          // border: '10px solid',
                          // borderColor: backgroundColor,
                        }}
                      >
                        {columns['2'].items.map((item, index) => {
                          return (
                            <Draggable
                              key={item}
                              //ToDo should be item.id.toString() but doesnt work with this initialisation
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    margin: '10px',
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  <IdeaCardVotingPage
                                    idea={item}
                                    index={index}
                                  />
                                </div>
                              )}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </Grid.Col>
            </DragDropContext>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  )
}
