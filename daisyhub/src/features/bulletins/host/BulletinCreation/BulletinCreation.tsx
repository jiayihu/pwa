import { useState, useEffect } from 'react';
import { Col, Collapse, FormGroup, Label, Spinner, Button, Row } from 'reactstrap';
import { format, parse } from 'date-fns';
import { Form, Formik } from 'formik';
import { string, object, number, ref } from 'yup';
import { useDispatch } from 'react-redux';
import { addBulletin } from '../../../../store/actions/bulletin.actions';
import { Fruit, Villager } from '../../../../types/island';
import { BulletinBody } from '../../../../types/bulletin';
import { NarrowContainer } from '../../../ui/NarrowContainer/NarrowContainer';
import { CollapseHeader } from '../../../ui/CollapseHeader/CollapseHeader';
import {
  TextFieldWithMessage,
  SelectFieldWithMessage,
  NumberFieldWithMessage,
  CheckboxFieldWithMessage,
  DateFieldWithMessage,
  TimeFieldWithMessage,
} from '../../../ui/Formik';

enum sections {
  ESSENTIAL = 'essential',
  ADVANCED = 'advanced',
}

export const BulletinCreation = () => {
  const [isOpenSection, setIsOpenSection] = useState(sections.ESSENTIAL);
  const [dateTime, setDateTime] = useState({ date: '', time: '' });
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const initDateTime = () => {
    const today = new Date();
    const date = format(today, 'yyyy-MM-dd');
    const time = format(today, 'HH:mm');
    setDateTime({ date, time });
  };

  useEffect(() => {
    initDateTime();
    setLoading(false);
  }, []);

  if (loading) return <Spinner type="grow" />;

  return (
    <NarrowContainer hasBg>
      <Formik
        initialValues={{
          dodo: '',
          island: {
            name: '',
            player: '',
            fruit: 'apple' as Fruit,
            villager: 'neither' as Villager,
            hemisphere: 'north' as 'north' | 'south',
          },
          turnipPrice: 100,
          description: '',
          date: dateTime.date,
          time: dateTime.time,
          preferences: {
            concurrent: 4,
            queue: 25,
            hasFee: false,
            isPrivate: false,
          },
        }}
        validationSchema={object({
          dodo: string()
            .length(5, 'Dodo Code must be exactly 5 characters')
            .required('DODO Code is required'),
          island: object({
            player: string().required('Player name is required'),
            name: string().required('Island name is required'),
          }),
          turnipPrice: number()
            .min(0, "The price can't be lower than 0 ")
            .max(999, 'Price too high'),
          description: string().required('A description is required'),
          preferences: object({
            queue: number()
              .min(1, "Queue can't be lower than 1")
              .min(
                ref('concurrent'),
                "You can't have less people in your queue than the concurrent ones",
              ),
            concurrent: number()
              .min(1, 'You need to have at least 1 person in your island')
              .max(ref('queue'), 'You cannot exceed your queue limits '),
          }),
        })}
        onSubmit={(fields) => {
          const date = parse(fields.date, 'yyyy-MM-dd', new Date());
          const time = parse(fields.time, 'HH:mm', new Date());
          date.setHours(time.getHours());
          date.setMinutes(time.getMinutes());
          date.setSeconds(time.getSeconds());

          const bulletinBody: BulletinBody = { ...fields, time: date.toISOString() };

          dispatch(addBulletin(bulletinBody));
        }}
      >
        {() => {
          return (
            <Form>
              <CollapseHeader
                isOpen={isOpenSection === sections.ESSENTIAL}
                onClick={() => setIsOpenSection(sections.ESSENTIAL)}
              >
                <h2 className="h3">Essential informations</h2>
              </CollapseHeader>
              <Collapse isOpen={isOpenSection === sections.ESSENTIAL}>
                <FormGroup>
                  <Label for="dodo">DODO Code</Label>
                  <TextFieldWithMessage id="dodo" name="dodo" />
                </FormGroup>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="island-name">Island Name</Label>
                      <TextFieldWithMessage id="island-name" name="island.name" />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="player-name">Player Name</Label>
                      <TextFieldWithMessage id="player-name" name="island.player" />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="description">Description and requests</Label>
                  <TextFieldWithMessage id="description" name="description" />
                </FormGroup>
                <FormGroup>
                  <Label for="fruit">Fruit</Label>
                  <SelectFieldWithMessage id="fruit" name="island.fruit">
                    <option value="apple">Apples</option>
                    <option value="peach">Peaches</option>
                    <option value="orange">Oranges</option>
                    <option value="pear">Pears</option>
                    <option value="cherry">Cherries</option>
                  </SelectFieldWithMessage>
                </FormGroup>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="price">Selling price</Label>
                      <NumberFieldWithMessage id="price" name="turnipPrice" min={0} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <Label for="fees">Entry fees</Label>
                    <FormGroup check>
                      <div>
                        <CheckboxFieldWithMessage id="fees" name="preferences.hasFee" />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </Collapse>
              <CollapseHeader
                isOpen={isOpenSection === sections.ADVANCED}
                onClick={() => setIsOpenSection(sections.ADVANCED)}
              >
                <h2 className="h3">Additional options</h2>
              </CollapseHeader>
              <Collapse isOpen={isOpenSection === sections.ADVANCED}>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="date">Date</Label>
                      <DateFieldWithMessage id="date" name="date" />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="time">Time</Label>
                      <TimeFieldWithMessage id="time" name="time" />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="concurrent">
                    How many people can visit your island at the same time?
                  </Label>
                  <NumberFieldWithMessage id="concurrent" name="preferences.concurrent" min={1} />
                </FormGroup>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="queue">Max queue length</Label>
                      <NumberFieldWithMessage id="queue" name="preferences.queue" min={1} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <Label for="is-private">
                      Private island - <small>Won't be listed publicly</small>
                    </Label>
                    <FormGroup check>
                      <div>
                        <CheckboxFieldWithMessage id="is-private" name="preferences.isPrivate" />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </Collapse>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </NarrowContainer>
  );
};
